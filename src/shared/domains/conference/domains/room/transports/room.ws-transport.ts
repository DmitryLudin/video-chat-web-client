import { WsTransport } from 'core/base-ws-transport';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { RoomEventEnum } from 'shared/domains/conference/constants';
import { IMember, Member } from 'shared/domains/conference/models';

export class RoomWsTransport extends WsTransport {
  constructor() {
    super('conferences/rooms');
  }

  listenMembers(callback: TWsTransportCallback<IMember[]>) {
    return this.listen<IMember[]>(
      RoomEventEnum.MEMBERS,
      this.deserializeArray(Member, callback)
    );
  }

  listenCloseRoom(callback: TWsTransportCallback<{ isRoomClosed: boolean }>) {
    return this.listen<{ isRoomClosed: boolean }>(
      RoomEventEnum.CLOSE_ROOM,
      callback
    );
  }
}

export const roomWsTransport = new RoomWsTransport();
