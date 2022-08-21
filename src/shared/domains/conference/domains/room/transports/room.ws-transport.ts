import { WsTransport } from 'core/base-ws-transport';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { RoomEventEnum } from 'shared/domains/conference/constants';
import { IMember, IRoom, Member, Room } from 'shared/domains/conference/models';

export class RoomWsTransport extends WsTransport {
  constructor() {
    super('room');
  }

  listenMembers(callback: TWsTransportCallback<IMember[]>) {
    return this.listen<IMember[]>(
      RoomEventEnum.MEMBERS,
      this.deserializeArray(Member, callback)
    );
  }

  listenJoinRoom(callback: TWsTransportCallback<IRoom>) {
    return this.listen<IRoom>(
      RoomEventEnum.JOIN_ROOM,
      this.deserialize(Room, callback)
    );
  }

  listenLeaveRoom(callback: TWsTransportCallback<IRoom>) {
    return this.listen<IRoom>(
      RoomEventEnum.LEAVE_ROOM,
      this.deserialize(Room, callback)
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
