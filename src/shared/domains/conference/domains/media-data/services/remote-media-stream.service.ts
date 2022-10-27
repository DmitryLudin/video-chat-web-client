import { MediaKind } from 'mediasoup-client/lib/RtpParameters';
import { MediaStreamService } from 'shared/domains/conference/domains/media-data/services/media-stream.service';
import {
  IMediaStreamService,
  TMediaStreamConstructor,
} from 'shared/domains/conference/domains/media-data/types';

export class RemoteMediaStreamService
  extends MediaStreamService
  implements IMediaStreamService
{
  constructor(options: TMediaStreamConstructor) {
    super(options);
  }

  async init(
    streams: Array<{
      producerId: string;
      mediaKind: MediaKind;
      isPaused: boolean;
    }>
  ) {
    await Promise.all([this.consume(streams[0]), this.consume(streams[1])]);
  }

  streamPause(mediaKind: MediaKind) {
    const store = this.getStoreByMediaKind(mediaKind);
    store?.getStore().remoteStream?.pause();
  }

  streamResume(mediaKind: MediaKind) {
    const store = this.getStoreByMediaKind(mediaKind);
    store?.getStore().remoteStream?.resume();
  }

  private async consume({
    producerId,
    mediaKind,
    isPaused,
  }: {
    producerId: string;
    mediaKind: MediaKind;
    isPaused: boolean;
  }) {
    const store = this.getStoreByMediaKind(mediaKind);

    if (!store) return;

    try {
      const { rtpCapabilities } = this.device;
      store.setLoading(true);

      const remoteStream = await this.httpTransport.createMediaStreamConsumer(
        this.meta.roomId,
        {
          memberId: this.meta.selfMemberId,
          producerId,
          rtpCapabilities,
          transportId: this.webRtcTransport.id,
          paused: true,
        }
      );

      const consumer = await this.webRtcTransport.consume(remoteStream);

      const localStream = this.createLocalStream(consumer.track);

      store.updateStore({
        localStream,
        remoteStream: consumer,
        isPaused,
      });

      if (isPaused) {
        this.streamPause(mediaKind);
      } else {
        await this.httpTransport.resumeMediaStreamConsumer(this.meta.roomId, {
          memberId: this.meta.selfMemberId,
          consumerId: consumer.id,
        });
      }

      if (mediaKind === 'audio') {
        this.createAudioLevelObserver(localStream);
      }

      consumer.on('trackended', () => {
        console.log('track ended');
      });

      consumer.on('transportclose', () => {
        console.log('produce transport close');
      });

      consumer.observer.on('pause', () => {
        console.log('paused');
        store.updateStore({ isPaused: true });
      });

      consumer.observer.on('resume', () => {
        console.log('resumed');
        store.updateStore({ isPaused: false });
      });
    } catch (err) {
      console.log('Consumer error:', err);
    } finally {
      store.setLoading(false);
    }
  }

  private createLocalStream(track: MediaStreamTrack) {
    const stream = new MediaStream([track.clone()]);
    stream.addTrack(track);
    return stream;
  }
}
