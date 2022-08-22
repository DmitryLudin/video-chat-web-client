import { RequestStore } from 'core';
import {
  roomTransport,
  RoomTransport,
  roomWsTransport,
  RoomWsTransport,
} from 'shared/domains/conference/domains/room/transports';
import { IMember, IRoom } from 'shared/domains/conference/models';
import {
  ICreateRoomDto,
  IJoinRoomDto,
} from 'shared/domains/conference/types/room-dto.types';

type TStore = {
  room: IRoom | null;
  members: IMember[];
  isRoomClosed: boolean;
};

const initialState: TStore = {
  room: null,
  members: [],
  isRoomClosed: false,
};

export class RoomService {
  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: RoomTransport,
    private readonly wsTransport: RoomWsTransport
  ) {}

  getByUserId(roomId: string, userId: number) {
    this._store.setLoading(true);

    return this.transport
      .getByUserId(roomId, userId)
      .then((room) => {
        this._store.updateStore({ room: room, members: room.members });

        return room;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  create(data: ICreateRoomDto) {
    this._store.setLoading(true);

    return this.transport
      .create(data)
      .then((room: IRoom) => {
        this._store.updateStore({ members: room.members, room });

        return room;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  join(roomId: string, data: IJoinRoomDto) {
    this._store.setLoading(true);

    return this.transport
      .joinRoom(roomId, data)
      .then((room: IRoom) => {
        this._store.updateStore({ members: room.members, room });

        return room;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  /* WebSocket */
  connect() {
    this.wsTransport.connect();
    this.wsTransport.listenJoinRoom((room: IRoom) =>
      this._store.updateStore({ room: room, members: room.members })
    );
    this.wsTransport.listenLeaveRoom((members: IMember[]) =>
      this._store.updateStore({ members })
    );
    this.wsTransport.listenCloseRoom(({ isRoomClosed }) =>
      this._store.updateStore({ isRoomClosed })
    );
    this.wsTransport.listenMembers((members: IMember[]) =>
      this._store.updateStore({ members })
    );
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  reset() {
    this._store.resetStore();
  }
}

export const roomService = new RoomService(roomTransport, roomWsTransport);
