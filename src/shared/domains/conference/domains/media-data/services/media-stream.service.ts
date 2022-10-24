import { RequestStore } from 'core';
import { Device } from 'mediasoup-client';
import { Consumer } from 'mediasoup-client/lib/Consumer';
import { Producer } from 'mediasoup-client/lib/Producer';
import { MediaKind } from 'mediasoup-client/lib/RtpParameters';
import { Transport } from 'mediasoup-client/lib/Transport';
import {
  MediaDataTransport,
  MediaDataWsTransport,
} from 'shared/domains/conference/domains/media-data/transports';
import {
  TMediaStreamConstructor,
  TMeta,
} from 'shared/domains/conference/domains/media-data/types';

type TVideoStore = {
  localStream?: MediaStream;
  remoteStream?: Producer | Consumer;
  isLoading: boolean;
  isPaused: boolean;
};

type TAudioStore = {
  localStream?: MediaStream;
  remoteStream?: Producer | Consumer;
  isLoading: boolean;
  isPaused: boolean;
};

export abstract class MediaStreamService {
  protected readonly meta: TMeta;
  protected readonly device: Device;

  protected readonly webRtcTransport: Transport;
  protected readonly httpTransport: MediaDataTransport;
  protected readonly wsTransport: MediaDataWsTransport;

  protected readonly _videoStore = new RequestStore<TVideoStore>({
    isLoading: false,
    isPaused: false,
  });
  protected readonly _audioStore = new RequestStore<TAudioStore>({
    isLoading: false,
    isPaused: false,
  });

  get videoStore() {
    return this._videoStore.getStore();
  }

  get audioStore() {
    return this._audioStore.getStore();
  }

  protected constructor(options: TMediaStreamConstructor) {
    this.meta = options.meta;
    this.device = options.device;
    this.webRtcTransport = options.webRtcTransport;
    this.httpTransport = options.httpTransport;
    this.wsTransport = options.wsTransport;
  }

  protected getStoreByMediaKind(mediaKind: MediaKind) {
    switch (mediaKind) {
      case 'video':
        return this._videoStore;
      case 'audio':
        return this._audioStore;
      default:
        return;
    }
  }
}
