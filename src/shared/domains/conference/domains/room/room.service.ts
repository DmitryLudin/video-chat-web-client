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
import { userService, UserService } from 'shared/domains/user/user.service';

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

  get selfMember() {
    const members = this._store.getStore().members;
    const user = this.userService.store.user;

    return members.find((member) => member.user.id === user?.id);
  }

  constructor(
    private readonly transport: RoomTransport,
    private readonly wsTransport: RoomWsTransport,
    private readonly userService: UserService
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

export const roomService = new RoomService(
  roomTransport,
  roomWsTransport,
  userService
);
