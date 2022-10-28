import { WsTransport } from 'core/base-ws-transport';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { MediaDataEventEnum } from 'shared/domains/conference/constants/media-data-event.enum';
import { IRoomMediaDataDto } from 'shared/domains/conference/domains/media-data/types';
import {
  IActiveSpeakerDto,
  IPauseResumeMediaStreamDto,
  IRemoteMediaData,
  IRemoteStreamCloseDto,
} from 'shared/domains/conference/types/media-data-dto.types';

export class MediaDataWsTransport extends WsTransport {
  constructor() {
    super('conferences/media-data');
  }

  listenMediaData(callback: TWsTransportCallback<IRoomMediaDataDto>) {
    return this.listen(MediaDataEventEnum.GET_MEDIA_DATA, callback);
  }

  listenNewMediaStreams(callback: TWsTransportCallback<IRemoteMediaData>) {
    return this.listen(MediaDataEventEnum.REMOTE_MEDIA_DATA, callback);
  }

  listenStreamPause(
    callback: TWsTransportCallback<IPauseResumeMediaStreamDto>
  ) {
    return this.listen(MediaDataEventEnum.STREAM_PAUSE, callback);
  }

  listenStreamResume(
    callback: TWsTransportCallback<IPauseResumeMediaStreamDto>
  ) {
    return this.listen(MediaDataEventEnum.STREAM_RESUME, callback);
  }

  listenActiveSpeaker(callback: TWsTransportCallback<IActiveSpeakerDto>) {
    return this.listen(MediaDataEventEnum.ACTIVE_SPEAKER, callback);
  }

  listenRemoteStreamClose(
    callback: TWsTransportCallback<IRemoteStreamCloseDto>
  ) {
    return this.listen(MediaDataEventEnum.CLOSE_STREAM, callback);
  }

  getNewMediaStreams() {
    return this.send(MediaDataEventEnum.REMOTE_MEDIA_DATA);
  }

  sendStreamPause(data: IPauseResumeMediaStreamDto) {
    return this.send(MediaDataEventEnum.STREAM_PAUSE, data);
  }

  sendStreamResume(data: IPauseResumeMediaStreamDto) {
    return this.send(MediaDataEventEnum.STREAM_RESUME, data);
  }
}

export const mediaDataWsTransport = new MediaDataWsTransport();
