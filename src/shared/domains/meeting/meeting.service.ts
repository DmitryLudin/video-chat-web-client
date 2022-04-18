import { RequestStore } from 'core';
import { ICreateMeetingDto } from 'shared/domains/meeting/dto';
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

  getById(meetingId: string) {
    this._store.setLoading(true);

    return this.transport
      .getById(meetingId)
      .then((meeting) => {
        this._store.updateStore({ meeting });
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

  connect(meetingId: string) {
    this.wsTransport.connect(() => {
      this.joinMeeting(meetingId);
    });
    this.wsTransport.listenJoinMeeting((data) =>
      this._store.updateStore({ ...data })
    );
    this.wsTransport.listenLeaveMeeting((data) =>
      this._store.updateStore({ ...data })
    );
  }

  joinMeeting(meetingId: string) {
    this.wsTransport.sendJoinMeeting(meetingId);
  }

  leaveMeeting(meetingId: string) {
    const user = this.userService.store.user as IUser;
    const member = this._store
      .getStore()
      .meeting?.members.find((member) => member.user.id === user.id) as IMember;
    this.wsTransport.sendLeaveMeeting({ meetingId, memberId: member.id });
    this.wsTransport.disconnect();
  }
}

export const meetingService = new MeetingService(
  meetingTransport,
  meetingWsTransport,
  userService
);
