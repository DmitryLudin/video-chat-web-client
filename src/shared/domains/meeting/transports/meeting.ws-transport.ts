import { WsTransport } from 'core/base-ws-transport';
import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import {
  IAddMessageDto,
  IWebrtcTransportData,
} from 'shared/domains/meeting/dto';
import {
  IMeeting,
  IMessage,
  Meeting,
  Message,
} from 'shared/domains/meeting/models';

export enum VideoChatAction {
  JOIN_ROOM = 'join_room',
  CLOSE_ROOM = 'close_room',
  LEAVE_ROOM = 'leave_room',
  SEND_MESSAGE = 'send_message',
  MESSAGES = 'messages',
  MEMBERS = 'members',
  ERROR = 'error',
  TRACKS = 'tracks',
  TRACK_PAUSE = 'track_pause',
  TRACK_RESUME = 'track_resume',
  ACTIVE_SPEAKER = 'active_speaker',
}

type TJoinMeetingBase = {
  messages: IMessage[];
  mediaData: {
    routerRtpCapabilities: RtpCapabilities;
    transports: IWebrtcTransportData;
  };
};

type TJoinMeetingCallback = TJoinMeetingBase & {
  meeting: IMeeting;
};

type TJoinMeetingResponse = TJoinMeetingBase & {
  room: IMeeting;
};

export class MeetingWsTransport extends WsTransport {
  sendGetMembers(data: { meetingId: string }) {
    this.send(VideoChatAction.MEMBERS, data);
  }

  listenMembers(callback: (data: { meeting: IMeeting }) => void) {
    return this.listen<{ room: IMeeting }>(VideoChatAction.MEMBERS, (data) => {
      callback({ meeting: this.deserialize(Meeting)(data.room) });
    });
  }

  listenJoinMeeting(callback: (data: TJoinMeetingCallback) => void) {
    return this.listen<TJoinMeetingResponse>(
      VideoChatAction.JOIN_ROOM,
      (data) => {
        callback({
          meeting: this.deserialize(Meeting)(data.room),
          messages: this.deserializeArray(Message)(data.messages),
          mediaData: data.mediaData,
        });
      }
    );
  }

  listenEndMeeting(callback: (data: { isMeetingOver: boolean }) => void) {
    return this.listen<{ isRoomClosed: boolean }>(
      VideoChatAction.CLOSE_ROOM,
      (data) => callback({ isMeetingOver: data.isRoomClosed })
    );
  }

  listenLeaveMeeting(callback: (data: { meeting: IMeeting }) => void) {
    return this.listen<{ room: IMeeting }>(
      VideoChatAction.LEAVE_ROOM,
      (data) => {
        callback({
          meeting: this.deserialize(Meeting)(data.room),
        });
      }
    );
  }

  // Сообщения
  sendMessage(addMessageData: IAddMessageDto) {
    return this.send(VideoChatAction.SEND_MESSAGE, addMessageData);
  }

  listenMessages(callback: (data: { messages: IMessage[] }) => void) {
    return this.listen<{ messages: IMessage[] }>(
      VideoChatAction.MESSAGES,
      (data) => {
        callback({
          messages: this.deserializeArray(Message)(data.messages),
        });
      }
    );
  }
}

export const meetingWsTransport = new MeetingWsTransport();
