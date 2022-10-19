import { RequestStore } from 'core';
import { Device } from 'mediasoup-client';
import { Consumer } from 'mediasoup-client/lib/Consumer';
import { MediaKind } from 'mediasoup-client/lib/RtpParameters';
import { Transport } from 'mediasoup-client/lib/Transport';
import {
  mediaDataTransport,
  MediaDataTransport,
} from 'shared/domains/conference/domains/media-data/transports';
import {
  TCreateConsumer,
  TMediaStreamTransportConnect,
  TMemberData,
  TMemberId,
  TRoomId,
  TTransportDto,
} from 'shared/domains/conference/domains/media-data/types';

type TStore = {
  consumers: Map<TMemberId, Map<MediaKind, Consumer>>;
};

const initialState: TStore = {
  consumers: new Map(),
};

export class ConsumersService {
  private device!: Device;
  private roomId!: TRoomId;
  private selfMemberId!: TMemberId;
  private consumerTransport?: Transport;

  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(private readonly transport: MediaDataTransport) {}

  init(data: TTransportDto) {
    this.device = data.device;
    this.roomId = data.roomId;
    this.selfMemberId = data.memberId;
    this.consumerTransport = this.createConsumeTransport(data);
  }

  /** Потребители потока */
  async createConsumers(tracks: Array<TCreateConsumer>) {
    for (const track of tracks) {
      const memberStream = this._store.getStore().consumers.get(track.memberId);
      const isSelfMember = track.memberId === this.selfMemberId;

      // if (!isSelfMember && !memberStream?.get(track.mediaKind)) {
      await this.createStreamConsumer(track);
      // }
    }
  }

  resetConsumers() {
    this._store.resetStore();
  }

  private async createStreamConsumer(data: TCreateConsumer) {
    if (!this.consumerTransport) return;

    try {
      const { rtpCapabilities } = this.device;

      console.log(data);
      const { track } = await this.transport.createMediaStreamConsumer(
        this.roomId,
        {
          ...data,
          rtpCapabilities,
          transportId: this.consumerTransport.id,
          paused: true,
        }
      );
      console.log(track);
      const consumer = await this.consumerTransport.consume(track);
      console.log(consumer);

      this._store.updateStore((prevState) => {
        const memberStream = prevState.consumers.get(data.memberId);

        prevState.consumers.set(
          data.memberId,
          memberStream
            ? memberStream.set(consumer.kind, consumer)
            : new Map([[consumer.kind, consumer]])
        );

        return prevState;
      });

      await this.transport.resumeMediaStreamConsumer(this.roomId, {
        memberId: data.memberId,
        consumerId: consumer.id,
      });

      consumer.on('trackended', () => {
        this.clearConsumer(data.memberId);
      });

      consumer.on('transportclose', () => {
        this.clearConsumer(data.memberId);
      });
    } catch (err) {
      console.log('Consumer error:', err);
    }
  }

  private clearConsumer(memberId: TMemberId) {
    this._store.updateStore((prevState) => {
      prevState.consumers.delete(memberId);

      return prevState;
    });
  }

  /** Транспорт */
  private createConsumeTransport({
    device,
    roomId,
    memberId,
    transportParams,
  }: TTransportDto) {
    try {
      const consumerTransport = device.createRecvTransport(transportParams);

      this.subscribeConnectTransport(consumerTransport, {
        memberId,
        roomId,
      });
      this.subscribeConnectionStateChange(consumerTransport);

      return consumerTransport;
    } catch (error) {
      console.log(error);
    }
  }

  /** Подписки */
  private subscribeConnectTransport(transport: Transport, data: TMemberData) {
    transport.on(
      'connect',
      (
        { dtlsParameters }: TMediaStreamTransportConnect,
        callback: VoidFunction,
        errback: ErrorCallback
      ) => {
        console.log('consumer connect');
        this.transport
          .connectMediaStream(data.roomId, {
            dtlsParameters,
            transportId: transport.id,
            memberId: data.memberId,
          })
          .then(callback)
          .catch(errback);
      }
    );
  }

  private subscribeConnectionStateChange(transport: Transport) {
    transport.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connecting':
          console.log('connecting');
          break;

        case 'connected':
          console.log('connected');
          break;

        case 'failed':
          console.log('failed');
          transport.close();
          break;

        default:
          break;
      }
    });
  }
}

export const consumersService = new ConsumersService(mediaDataTransport);
