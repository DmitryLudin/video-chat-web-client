import { WsTransport } from 'core/base-ws-transport';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { MediaDataEventEnum } from 'shared/domains/conference/constants/media-data-event.enum';
import {
  INewMediaStreams,
  IRoomMediaDataDto,
} from 'shared/domains/conference/domains/media-data/types';

export class MediaDataWsTransport extends WsTransport {
  constructor() {
    super('conferences/media-data');
  }

  listenMediaData(callback: TWsTransportCallback<IRoomMediaDataDto>) {
    return this.listen(MediaDataEventEnum.GET_MEDIA_DATA, callback);
  }

  listenNewMediaStreams(callback: TWsTransportCallback<INewMediaStreams>) {
    return this.listen(MediaDataEventEnum.NEW_TRACKS, callback);
  }

  getNewMediaStreams() {
    return this.send(MediaDataEventEnum.NEW_TRACKS);
  }
}

export const mediaDataWsTransport = new MediaDataWsTransport();
