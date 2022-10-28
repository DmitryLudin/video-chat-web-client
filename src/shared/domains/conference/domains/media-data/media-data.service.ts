import { RequestStore } from 'core';
import { Device } from 'mediasoup-client';
import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import { Transport } from 'mediasoup-client/lib/Transport';
import {
  LocalMediaStreamService,
  RemoteMediaStreamService,
} from 'shared/domains/conference/domains/media-data/services';
import {
  mediaDataTransport,
  MediaDataTransport,
} from 'shared/domains/conference/domains/media-data/transports';
import {
  MediaDataWsTransport,
  mediaDataWsTransport,
} from 'shared/domains/conference/domains/media-data/transports/media-data.ws-transport';
import {
  IRoomMediaDataDto,
  TMemberId,
  IWebrtcTransportParams,
  TMediaStreamProduce,
  TMediaStreamTransportConnect,
  TMeta,
  TRemoteMemberMediaData,
  IMediaStreamService,
} from 'shared/domains/conference/domains/media-data/types';
import {
  ICreateMediaDataDto,
  IPauseResumeMediaStreamDto,
  IRemoteMediaData,
} from 'shared/domains/conference/types/media-data-dto.types';

type TStore = {
  activeMemberId?: string;
  members: Record<TMemberId, IMediaStreamService | undefined>;
};

type TWebRtcTransports = {
  send?: Transport;
  receive?: Transport;
};

const initialState: TStore = {
  members: {},
};

export class MediaDataService {
  private meta!: TMeta;
  private device: Device | null = null;
  private webRtcTransports!: TWebRtcTransports;

  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: MediaDataTransport,
    private readonly wsTransport: MediaDataWsTransport
  ) {}

  getLocalStreamService() {
    const localStreamService =
      this._store.getStore().members[this.meta?.selfMemberId];

    if (localStreamService instanceof LocalMediaStreamService)
      return localStreamService;
  }

  getStreamServiceByMemberId(memberId: string) {
    return this._store.getStore().members[memberId];
  }

  /*
  Создает медиа-данные комнаты (инициализирует роутер и класс для работы с медиа данными)
  и добавляет туда автора
  */
  createMediaData(roomId: string, data: ICreateMediaDataDto) {
    this._store.setLoading(true);

    return this.transport
      .createMediaData(roomId, data)
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  /* Создает медиа-поток нового участника конференции в комнате */
  addMediaStream(roomId: string, data: ICreateMediaDataDto) {
    this._store.setLoading(true);

    return this.transport
      .addMediaStream(roomId, data)
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  connect() {
    this.wsTransport.connect();

    this.wsTransport.listenMediaData(async (data: IRoomMediaDataDto) => {
      await this.initMediaData(data);
    });

    this.wsTransport.listenNewMediaStreams((data: IRemoteMediaData) => {
      this.createRemoteMediaStreams(data.membersMediaData);
    });

    this.wsTransport.listenStreamPause((data: IPauseResumeMediaStreamDto) => {
      if (data.memberId === this.meta?.selfMemberId) return;
      const streamService = this._store.getStore().members[data.memberId];
      streamService?.streamPause(data.kind);
    });

    this.wsTransport.listenStreamResume((data: IPauseResumeMediaStreamDto) => {
      if (data.memberId === this.meta?.selfMemberId) return;
      const streamService = this._store.getStore().members[data.memberId];
      streamService?.streamResume(data.kind);
    });

    this.wsTransport.listenActiveSpeaker(({ memberId }) => {
      this._store.updateStore({ activeMemberId: memberId });
    });
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  reset() {
    const localStreamService = this.getLocalStreamService();
    localStreamService?.reset();
    this._store.resetStore();
  }

  private async initMediaData({
    roomId,
    memberId,
    mediaData,
  }: IRoomMediaDataDto) {
    const [sendTransportParams, receiveTransportParams] = mediaData.transports;
    this._store.setLoading(true);

    this.meta = { roomId, selfMemberId: memberId };

    this.device = await this.loadDevice(mediaData.routerRtpCapabilities);

    this.webRtcTransports = {
      send: this.createSendTransport(sendTransportParams),
      receive: this.createReceiveTransport(receiveTransportParams),
    };

    if (this.device && this.webRtcTransports.send) {
      const localStreamService = new LocalMediaStreamService({
        meta: this.meta,
        device: this.device,
        webRtcTransport: this.webRtcTransports.send,
        wsTransport: this.wsTransport,
        httpTransport: this.transport,
      });
      await localStreamService.init();
      this._store.updateStore((prevState) => {
        prevState.members[memberId] = localStreamService;
        return prevState;
      });
      this._store.setLoading(false);
    }
  }

  private createRemoteMediaStreams(membersMediaData: TRemoteMemberMediaData[]) {
    if (!this.device || !this.webRtcTransports.receive || !this.meta) return;
    const device = this.device;
    const webRtcTransport = this.webRtcTransports.receive;

    membersMediaData
      .filter(
        (mediaData) =>
          mediaData.memberId !== this.meta.selfMemberId &&
          !this._store.getStore().members[mediaData.memberId]
      )
      .forEach((mediaData) => {
        const remoteStreamService = new RemoteMediaStreamService({
          meta: this.meta,
          device,
          webRtcTransport,
          wsTransport: this.wsTransport,
          httpTransport: this.transport,
        });
        void remoteStreamService.init(mediaData.streams);
        this._store.updateStore((prevState) => {
          prevState.members[mediaData.memberId] = remoteStreamService;
          return prevState;
        });
      });
  }

  /*
  Устройство представляет собой конечную точку,
  которая подключается к маршрутизатору сервера для отправки и/или получения мультимедиа.
  */
  private async loadDevice(routerRtpCapabilities: RtpCapabilities) {
    try {
      const device = new Device();
      await device.load({ routerRtpCapabilities });
      return device;
    } catch (error: unknown) {
      const createDeviceError = error as { name: string };

      if (createDeviceError.name === 'UnsupportedError') {
        console.error('Browser not supported');
        alert('Browser not supported');
      }

      console.error(error);
      return null;
    }
  }

  /*
  Экземпляр транспорта на клиенте представляет локальную часть транспорта WebRTC на сервере.
  Он соединяет устройство клиента с маршрутизатором сервера на уровне мультимедиа и позволяет
  отправлять медиа (с помощью экземпляров Производителя) или получать медиа (с помощью экземпляров Потребителя).

  Внутренне транспорт содержит экземпляр WebRTC RTCPeerConnection.
  */
  private createSendTransport(transportParams: IWebrtcTransportParams) {
    try {
      if (!this.device) {
        throw new Error('Device не инициализирован');
      }

      const sendTransport = this.device.createSendTransport(transportParams);

      this.subscribeConnectTransport(sendTransport);
      this.subscribeProduceTrack(sendTransport);
      this.subscribeConnectionStateChange(sendTransport);

      return sendTransport;
    } catch (error) {
      console.log(error);
    }
  }

  private createReceiveTransport(transportParams: IWebrtcTransportParams) {
    try {
      if (!this.device) {
        throw new Error('Device не инициализирован');
      }

      const recvTransport = this.device.createRecvTransport(transportParams);

      this.subscribeConnectTransport(recvTransport);
      this.subscribeConnectionStateChange(recvTransport);

      return recvTransport;
    } catch (error) {
      console.log(error);
    }
  }

  /*
  Вызывается, когда транспорт собирается установить соединение ICE+DTLS
  и должен обмениваться информацией с соответствующим транспортом на стороне сервера.
  */
  private subscribeConnectTransport(transport: Transport) {
    transport.on(
      'connect',
      (
        { dtlsParameters }: TMediaStreamTransportConnect,
        callback: VoidFunction,
        errback: ErrorCallback
      ) => {
        this.transport
          .connectMediaStream(this.meta.roomId, {
            dtlsParameters,
            transportId: transport.id,
            memberId: this.meta.selfMemberId,
          })
          .then(callback)
          .catch(errback);
      }
    );
  }

  /*
  Вызывается, когда транспорт должен передать информацию о новом производителе
  на соответствующий транспорт на стороне сервера. Это событие происходит до завершения метода produce().
  */
  private subscribeProduceTrack(transport: Transport) {
    transport.on(
      'produce',
      (
        { kind, rtpParameters }: TMediaStreamProduce,
        callback: (data: { id: string }) => void,
        errback: ErrorCallback
      ) => {
        this.transport
          .createMediaStreamProducer(this.meta.roomId, {
            memberId: this.meta.selfMemberId,
            transportId: transport.id,
            kind,
            rtpParameters,
            paused: false,
          })
          .then((data) => {
            callback({ id: data.producerId });
          })
          .catch(errback);
      }
    );
  }

  /* Вызывается при изменении состояния локального транспортного соединения. */
  private subscribeConnectionStateChange(transport: Transport) {
    transport.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connecting':
          console.log('connecting');
          break;

        case 'connected':
          console.log('connected');
          break;

        default:
          console.log('failed');
          transport.close();
          break;
      }
    });
  }
}

export const mediaDataService = new MediaDataService(
  mediaDataTransport,
  mediaDataWsTransport
);
