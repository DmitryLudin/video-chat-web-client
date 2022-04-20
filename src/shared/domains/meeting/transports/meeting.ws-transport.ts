import { WsTransport } from 'core/base-ws-transport';
import {
  ILeaveMeetingDto,
  ISendJoinMeetingDto,
} from 'shared/domains/meeting/dto';
import { IMeeting } from 'shared/domains/meeting/models';

export enum VideoChatAction {
  CREATE_MEETING = 'create_meeting',
  JOIN_MEETING = 'join_meeting',
  END_MEETING = 'end_meeting',
  LEAVE_MEETING = 'leave_meeting',
  SEND_MESSAGE = 'send_message',
  MESSAGES = 'messages',
}

export class MeetingWsTransport extends WsTransport {
  sendJoinMeeting(meetingData: ISendJoinMeetingDto) {
    return this.send(VideoChatAction.JOIN_MEETING, meetingData);
  }

  sendLeaveMeeting(data: ILeaveMeetingDto) {
    return this.send(VideoChatAction.LEAVE_MEETING, data);
  }

  listenJoinMeeting(callback: (data: { meeting: IMeeting }) => void) {
    return this.listen<{ meeting: IMeeting }>(
      VideoChatAction.JOIN_MEETING,
      callback
    );
  }

  listenLeaveMeeting(callback: (data: { meeting: IMeeting }) => void) {
    return this.listen<{ meeting: IMeeting }>(
      VideoChatAction.LEAVE_MEETING,
      callback
    );
  }
}

export const meetingWsTransport = new MeetingWsTransport();
