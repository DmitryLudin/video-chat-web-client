import { RequestStore } from 'core';
import { Device } from 'mediasoup-client';
import { Producer } from 'mediasoup-client/lib/Producer';
import { MediaKind } from 'mediasoup-client/lib/RtpParameters';
import { Transport } from 'mediasoup-client/lib/Transport';
import {
  videoCodecOptions,
  videoEncodings,
} from 'shared/constants/media.constants';
import {
  mediaDataTransport,
  MediaDataTransport,
  mediaDataWsTransport,
  MediaDataWsTransport,
} from 'shared/domains/conference/domains/media-data/transports';
import {
  TCreateProducer,
  TMediaStreamProduce,
  TMediaStreamTransportConnect,
  TMemberData,
  TTransportDto,
} from 'shared/domains/conference/domains/media-data/types';

type TStore = {
  producers: Record<MediaKind, Producer | null>;
};

const initialState: TStore = {
  producers: { video: null, audio: null },
};

export class ProducersService {
  private device!: Device;
  private producerTransport?: Transport;

  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: MediaDataTransport,
    private readonly wsTransport: MediaDataWsTransport
  ) {}

  init(data: TTransportDto) {
    this.device = data.device;
    this.producerTransport = this.createProduceTransport(data);
  }

  /** Прозводитель потока */
  async createStreamProducer({ track }: TCreateProducer) {
    try {
      if (
        !this.producerTransport ||
        !this.device.canProduce(track.kind as MediaKind)
      ) {
        throw new Error('Cannot produce track');
      }

      const producer = await this.producerTransport.produce({
        track,
        encodings: videoEncodings,
        codecOptions: videoCodecOptions,
      });
      console.log('Producer', producer);

      this._store.updateStore((prevState) => {
        prevState.producers[producer.kind] = producer;
        return prevState;
      });

      this.wsTransport.getNewMediaStreams();

      producer.on('trackended', () => {
        console.log('track ended');
        this.clearProducer();
      });

      producer.on('transportclose', () => {
        console.log('produce transport close');
        this.clearProducer();
      });

      producer.on('@close', () => {
        console.log('Closing producer');
        this.clearProducer();
      });
    } catch (err) {
      console.log('Produce error:', err);
    }
  }

  clearProducer() {
    this._store.resetStore();
  }

  /** Транспорт */
  private createProduceTransport({
    device,
    roomId,
    memberId,
    transportParams,
  }: TTransportDto) {
    try {
      const producerTransport = device.createSendTransport(transportParams);

      this.subscribeConnectTransport(producerTransport, {
        memberId,
        roomId,
      });
      this.subscribeProduceTrack(producerTransport, { memberId, roomId });
      this.subscribeConnectionStateChange(producerTransport);

      return producerTransport;
    } catch (error) {
      console.log(error);
    }
  }

  /** Подписки */
  private subscribeProduceTrack(transport: Transport, data: TMemberData) {
    transport.on(
      'produce',
      (
        { kind, rtpParameters }: TMediaStreamProduce,
        callback: (data: { id: string }) => void,
        errback: ErrorCallback
      ) => {
        console.log('produce');
        this.transport
          .createMediaStreamProducer(data.roomId, {
            memberId: data.memberId,
            transportId: transport.id,
            kind,
            rtpParameters,
            paused: false,
          })
          .then((data) => {
            callback({ id: data.track.producerId });
          })
          .catch(errback);
      }
    );
  }

  private subscribeConnectTransport(transport: Transport, data: TMemberData) {
    transport.on(
      'connect',
      (
        { dtlsParameters }: TMediaStreamTransportConnect,
        callback: VoidFunction,
        errback: ErrorCallback
      ) => {
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
          this._store.setLoading(true);
          break;

        case 'connected':
          console.log('connected');
          this._store.setLoading(false);
          break;

        default:
          console.log('failed');
          this._store.setLoading(false);
          transport.close();
          break;
      }
    });
  }
}

export const producersService = new ProducersService(
  mediaDataTransport,
  mediaDataWsTransport
);
