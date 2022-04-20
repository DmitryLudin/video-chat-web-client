import { RequestStore } from 'core';
import {
  ICreateMeetingDto,
  IJoinMeetingDto,
  ISendJoinMeetingDto,
} from 'shared/domains/meeting/dto';
import { IMeeting, IMember } from 'shared/domains/meeting/models';
import {
  MeetingTransport,
  meetingTransport,
  meetingWsTransport,
  MeetingWsTransport,
} from 'shared/domains/meeting/transports';
import { IUser } from 'shared/domains/user/user.model';
import { userService, UserService } from 'shared/domains/user/user.service';

type TMeetingStore = {
  messages: string[];
  meeting: IMeeting | null;
};

const initialMeetingState: TMeetingStore = {
  messages: [],
  meeting: null,
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
    private readonly wsTransport: MeetingWsTransport,
    private readonly userService: UserService
  ) {}

  getByUserId(meetingId: string, userId: number) {
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

  resetStore() {
    this._store.resetStore();
  }

  connect() {
    this.wsTransport.connect();
    this.wsTransport.listenJoinMeeting((data) =>
      this._store.updateStore({ ...data })
    );
    this.wsTransport.listenLeaveMeeting((data) =>
      this._store.updateStore({ ...data })
    );
  }

  sendJoinMeeting(joinMeetingData: ISendJoinMeetingDto) {
    this.wsTransport.sendJoinMeeting(joinMeetingData);
  }

  disconnect() {
    const meeting = this._store.getStore().meeting;
    console.log(meeting);
    if (meeting) {
      console.log('disconnect');
      this.wsTransport.disconnect();
    }
  }
}

export const meetingService = new MeetingService(
  meetingTransport,
  meetingWsTransport,
  userService
);
