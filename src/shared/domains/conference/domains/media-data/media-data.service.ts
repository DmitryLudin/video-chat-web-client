import { RequestStore } from 'core';
import { Device } from 'mediasoup-client';
import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import {
  consumersService,
  ConsumersService,
  ProducersService,
  producersService,
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
  INewMediaStreams,
} from 'shared/domains/conference/domains/media-data/types';
import { ICreateMediaDataDto } from 'shared/domains/conference/types/media-data-dto.types';

type TStore = {
  isInitialized: boolean;
};

const initialState: TStore = {
  isInitialized: false,
};

export class MediaDataService {
  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return {
      store: this._store.getStore(),
      producers: this.producersService.store,
      consumers: this.consumersService.store,
    };
  }

  constructor(
    private readonly transport: MediaDataTransport,
    private readonly wsTransport: MediaDataWsTransport,
    private readonly producersService: ProducersService,
    private readonly consumersService: ConsumersService
  ) {}

  /** Создает медиа-данные комнаты (инициализирует роутер и класс для работы с медиа данными)
   * и добавляет туда автора  */
  createMediaData(roomId: string, data: ICreateMediaDataDto) {
    this._store.setLoading(true);

    return this.transport
      .createMediaData(roomId, data)
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  /** Создает медиа-поток нового участника конференции в комнате */
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
    this.wsTransport.listenNewMediaStreams(async (data: INewMediaStreams) => {
      await this.consumersService.createConsumers(data.tracks);
    });
  }

  disconnect() {
    this.wsTransport.disconnect();
    this.producersService.clearProducer();
    this.consumersService.resetConsumers();
  }

  private async initMediaData({
    roomId,
    memberId,
    mediaData,
  }: IRoomMediaDataDto) {
    const [producerTransportParams, consumerTransportParams] =
      mediaData.transports;

    console.log(producerTransportParams);

    const device = await this.loadDevice(mediaData.routerRtpCapabilities);

    if (device) {
      this.producersService.init({
        device,
        roomId,
        memberId,
        transportParams: producerTransportParams,
      });

      this.consumersService.init({
        device,
        roomId: roomId,
        memberId,
        transportParams: consumerTransportParams,
      });

      this._store.updateStore({ isInitialized: true });
    }
  }

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
}

export const mediaDataService = new MediaDataService(
  mediaDataTransport,
  mediaDataWsTransport,
  producersService,
  consumersService
);
