import { RequestStore } from 'core';
import {
  IAddMessageDto,
  ICreateConferenceDto,
  IJoinConferenceDto,
} from 'shared/domains/conference/dto';
import { IRoom, IMember, IMessage } from 'shared/domains/conference/models';
import {
  ConferenceTransport,
  conferenceTransport,
  conferenceWsTransport,
  ConferenceWsTransport,
} from 'shared/domains/conference/transports';

type TConferenceStore = {
  messages: IMessage[];
  room: IRoom | null;
  members: IMember[];
  isConferenceOver: boolean;
};

const initialConferenceState: TConferenceStore = {
  messages: [],
  members: [],
  room: null,
  isConferenceOver: false,
};

class ConferenceService {
  private readonly _store = new RequestStore<TConferenceStore>(
    initialConferenceState
  );

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: ConferenceTransport,
    private readonly wsTransport: ConferenceWsTransport
  ) {}

  async getByUserId(roomId: string, userId: number) {
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

  create(roomData: ICreateConferenceDto) {
    this._store.setLoading(true);

    return this.transport
      .create(roomData)
      .then((room) => {
        this._store.updateStore({ room: room, members: room.members });

        return room;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  join(roomId: string, joinRoomData: IJoinConferenceDto) {
    this._store.setLoading(true);

    return this.transport
      .joinRoom(roomId, joinRoomData)
      .then((room) => {
        this._store.updateStore({ room: room, members: room.members });

        return room;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  connect() {
    this.wsTransport.connect();
    this.wsTransport.listenJoinRoom(({ room, mediaData }) => {
      this._store.updateStore({
        room: room,
        members: room.members,
      });
    });
    this.wsTransport.listenLeaveRoom(({ room }) =>
      this._store.updateStore({ room: room, members: room.members })
    );
    this.wsTransport.listenEndRoom(({ isConferenceOver }) =>
      this._store.updateStore({ isConferenceOver: isConferenceOver })
    );
    this.wsTransport.listenMessages(({ messages }) => {
      this._store.updateStore({ messages });
    });
    this.wsTransport.listenMembers(({ members }) =>
      this._store.updateStore({ members })
    );
  }

  sendMessage(messageData: IAddMessageDto) {
    this.wsTransport.sendMessage(messageData);
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  resetStore() {
    this._store.resetStore();
  }
}

export const conferenceService = new ConferenceService(
  conferenceTransport,
  conferenceWsTransport
);
