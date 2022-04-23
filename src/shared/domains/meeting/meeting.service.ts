import { RequestStore } from 'core';
import { ICreateMeetingDto, IJoinMeetingDto } from 'shared/domains/meeting/dto';
import { IMeeting, IMember } from 'shared/domains/meeting/models';
import {
  MeetingTransport,
  meetingTransport,
  meetingWsTransport,
  MeetingWsTransport,
} from 'shared/domains/meeting/transports';

type TMeetingStore = {
  messages: string[];
  meeting: IMeeting | null;
  members: IMember[];
  isMeetingOver: boolean;
};

const initialMeetingState: TMeetingStore = {
  messages: [],
  meeting: null,
  members: [],
  isMeetingOver: false,
};

class MeetingService {
  private readonly _store = new RequestStore<TMeetingStore>(
    initialMeetingState
  );

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: MeetingTransport,
    private readonly wsTransport: MeetingWsTransport
  ) {}

  async getByUserId(meetingId: string, userId: number) {
    this._store.setLoading(true);

    return this.transport
      .getByUserId(meetingId, userId)
      .then((meeting) => {
        this._store.updateStore({ meeting });

        return meeting;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  create(meetingData: ICreateMeetingDto) {
    this._store.setLoading(true);

    return this.transport
      .create(meetingData)
      .then((meeting) => {
        this._store.updateStore({ meeting });

        return meeting;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  joinMeeting(meetingId: string, joinMeetingData: IJoinMeetingDto) {
    this._store.setLoading(true);

    return this.transport
      .joinMeeting(meetingId, joinMeetingData)
      .then((meeting) => {
        this._store.updateStore({ meeting });

        return meeting;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  connect() {
    this.wsTransport.connect();
    this.wsTransport.listenJoinMeeting(({ meeting }) =>
      this._store.updateStore({ meeting })
    );
    this.wsTransport.listenLeaveMeeting(({ meeting }) =>
      this._store.updateStore({ meeting })
    );
    this.wsTransport.listenEndMeeting(({ isMeetingOver }) =>
      this._store.updateStore({ isMeetingOver })
    );
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  resetStore() {
    this._store.resetStore();
  }
}

export const meetingService = new MeetingService(
  meetingTransport,
  meetingWsTransport
);
