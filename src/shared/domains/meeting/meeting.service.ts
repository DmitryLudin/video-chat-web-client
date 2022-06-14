import { RequestStore } from 'core';
import {
  IAddMessageDto,
  ICreateMeetingDto,
  IJoinMeetingDto,
} from 'shared/domains/meeting/dto';
import { IMeeting, IMember, IMessage } from 'shared/domains/meeting/models';
import {
  MeetingTransport,
  meetingTransport,
  meetingWsTransport,
  MeetingWsTransport,
} from 'shared/domains/meeting/transports';
// import {
//   WebRtcService,
//   webRtcService,
// } from 'shared/domains/webrtc/webrtc.service';

type TMeetingStore = {
  messages: IMessage[];
  meeting: IMeeting | null;
  members: IMember[];
  isMeetingOver: boolean;
};

const initialMeetingState: TMeetingStore = {
  messages: [],
  members: [],
  meeting: null,
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
    private readonly wsTransport: MeetingWsTransport // private readonly webRtcService: WebRtcService
  ) {}

  async getByUserId(meetingId: string, userId: number) {
    this._store.setLoading(true);

    return this.transport
      .getByUserId(meetingId, userId)
      .then((meeting) => {
        this._store.updateStore({ meeting, members: meeting.members });

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
        this._store.updateStore({ meeting, members: meeting.members });

        return meeting;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  join(meetingId: string, joinMeetingData: IJoinMeetingDto) {
    this._store.setLoading(true);

    return this.transport
      .joinMeeting(meetingId, joinMeetingData)
      .then((meeting) => {
        this._store.updateStore({ meeting, members: meeting.members });

        return meeting;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  connect() {
    this.wsTransport.connect();
    this.wsTransport.listenJoinMeeting(({ meeting, messages, mediaData }) => {
      this._store.updateStore({ meeting, members: meeting.members, messages });
      // await this.webRtcService.connect({ meeting, routerRtpCapabilities });
    });
    this.wsTransport.listenLeaveMeeting(({ meeting }) =>
      this._store.updateStore({ meeting, members: meeting.members })
    );
    this.wsTransport.listenEndMeeting(({ isMeetingOver }) =>
      this._store.updateStore({ isMeetingOver })
    );
    this.wsTransport.listenMessages(({ messages }) => {
      this._store.updateStore({ messages });
    });
    this.wsTransport.listenMembers(({ meeting }) =>
      this._store.updateStore({ members: meeting.members })
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

export const meetingService = new MeetingService(
  meetingTransport,
  meetingWsTransport
  // webRtcService
);
