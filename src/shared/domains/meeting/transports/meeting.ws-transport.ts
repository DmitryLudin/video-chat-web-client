import { WsTransport } from 'core/base-ws-transport';
import { IAddMessageDto } from 'shared/domains/meeting/dto';
import { IMeeting, IMessage } from 'shared/domains/meeting/models';

export enum VideoChatAction {
  JOIN_MEETING = 'join_meeting',
  END_MEETING = 'end_meeting',
  LEAVE_MEETING = 'leave_meeting',
  SEND_MESSAGE = 'send_message',
  MESSAGES = 'messages',
}

export class MeetingWsTransport extends WsTransport {
  listenJoinMeeting(
    callback: (data: { meeting: IMeeting; messages: IMessage[] }) => void
  ) {
    return this.listen<{ meeting: IMeeting; messages: IMessage[] }>(
      VideoChatAction.JOIN_MEETING,
      callback
    );
  }

  listenEndMeeting(callback: (data: { isMeetingOver: boolean }) => void) {
    return this.listen<{ isMeetingOver: boolean }>(
      VideoChatAction.END_MEETING,
      callback
    );
  }

  listenLeaveMeeting(callback: (data: { meeting: IMeeting }) => void) {
    return this.listen<{ meeting: IMeeting }>(
      VideoChatAction.LEAVE_MEETING,
      callback
    );
  }

  sendMessage(addMessageData: IAddMessageDto) {
    return this.send(VideoChatAction.SEND_MESSAGE, addMessageData);
  }

  listenMessages(callback: (data: { messages: IMessage[] }) => void) {
    return this.listen<{ messages: IMessage[] }>(
      VideoChatAction.MESSAGES,
      callback
    );
  }
}

export const meetingWsTransport = new MeetingWsTransport();
