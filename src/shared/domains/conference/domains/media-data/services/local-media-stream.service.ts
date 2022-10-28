import { ProducerOptions } from 'mediasoup-client/lib/Producer';
import { MediaKind } from 'mediasoup-client/lib/RtpParameters';
import {
  audioMediaConstraints,
  videoCodecOptions,
  videoEncodings,
  videoMediaConstraints,
} from 'shared/domains/conference/domains/media-data/constants';
import { MediaStreamService } from 'shared/domains/conference/domains/media-data/services/media-stream.service';
import {
  IMediaStreamService,
  TMediaStreamConstructor,
} from 'shared/domains/conference/domains/media-data/types';

export class LocalMediaStreamService
  extends MediaStreamService
  implements IMediaStreamService
{
  constructor(options: TMediaStreamConstructor) {
    super(options);
  }

  async init() {
    await Promise.all([this.createVideoStream(), this.createAudioStream()]);
    this.wsTransport.getNewMediaStreams();
  }

  streamPause(mediaKind: MediaKind) {
    const store = this.getStoreByMediaKind(mediaKind);

    if (!store) return;

    const { roomId, selfMemberId } = this.meta;
    const { localStream, remoteStream } = store.getStore();

    if (localStream && remoteStream) {
      this.wsTransport.sendStreamPause({
        roomId,
        memberId: selfMemberId,
        producerId: remoteStream.id,
        kind: remoteStream.kind,
      });
      remoteStream.pause();
    }
  }

  streamResume(mediaKind: MediaKind) {
    const store = this.getStoreByMediaKind(mediaKind);

    if (!store) return;

    const { roomId, selfMemberId } = this.meta;
    const { localStream, remoteStream } = store.getStore();

    if (localStream && remoteStream) {
      this.wsTransport.sendStreamResume({
        roomId,
        memberId: selfMemberId,
        producerId: remoteStream.id,
        kind: remoteStream.kind,
      });
      remoteStream.resume();
    }
  }

  reset() {
    this._videoStore
      .getStore()
      .localStream?.getTracks()
      .forEach((track) => track.stop());
    this._audioStore
      .getStore()
      .localStream?.getTracks()
      .forEach((track) => track.stop());
  }

  private async createVideoStream() {
    try {
      this._videoStore.setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia(
        videoMediaConstraints
      );

      const producer = await this.produce(
        {
          track: stream.getVideoTracks()[0],
          encodings: videoEncodings,
          codecOptions: videoCodecOptions,
        },
        () => this._videoStore.updateStore({ isPaused: true }),
        () => this._videoStore.updateStore({ isPaused: false })
      );

      this._videoStore.updateStore({
        localStream: stream,
        remoteStream: producer,
        isPaused: producer?.paused,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this._videoStore.setLoading(false);
    }
  }

  private async createAudioStream() {
    try {
      this._audioStore.setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia(
        audioMediaConstraints
      );

      const producer = await this.produce(
        {
          track: stream.getAudioTracks()[0],
        },
        () => this._audioStore.updateStore({ isPaused: true }),
        () => this._audioStore.updateStore({ isPaused: false })
      );

      this._audioStore.updateStore({
        localStream: stream,
        remoteStream: producer,
        isPaused: producer?.paused,
      });

      this.createAudioLevelObserver(stream);
    } catch (error) {
      console.log(error);
    } finally {
      this._audioStore.setLoading(false);
    }
  }

  private async produce(
    options: ProducerOptions,
    onPauseCallback: VoidFunction,
    onResumeCallback: VoidFunction
  ) {
    try {
      if (!this.device.canProduce(options.track?.kind as MediaKind)) {
        throw new Error('Cannot produce track');
      }

      const producer = await this.webRtcTransport.produce(options);

      producer.on('trackended', () => {
        console.log('track ended');
      });

      producer.on('transportclose', () => {
        console.log('produce transport close');
      });

      producer.observer.on('close', () => {
        console.log('Closing producer');
      });

      producer.observer.on('pause', onPauseCallback);

      producer.observer.on('resume', onResumeCallback);

      return producer;
    } catch (err) {
      console.log('Produce error:', err);
      throw err;
    }
  }
}
