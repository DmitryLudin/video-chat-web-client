import { WsTransport } from 'core/base-ws-transport';
import { IAddMessageDto } from 'shared/domains/conference/dto';
import {
  IRoom,
  IMessage,
  Room,
  Message,
  IMember,
  Member,
} from 'shared/domains/conference/models';
import {
  TJoinConferenceCallback,
  TJoinConferenceResponse,
} from 'shared/domains/conference/types';

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

export class ConferenceWsTransport extends WsTransport {
  sendGetMembers(data: { roomId: string }) {
    this.send(VideoChatAction.MEMBERS, data);
  }

  listenMembers(callback: (data: { members: IMember[] }) => void) {
    return this.listen<{ members: IMember[] }>(
      VideoChatAction.MEMBERS,
      (data) => {
        callback({ members: this.deserializeArray(Member)(data.members) });
      }
    );
  }

  listenJoinRoom(callback: (data: TJoinConferenceCallback) => void) {
    return this.listen<TJoinConferenceResponse>(
      VideoChatAction.JOIN_ROOM,
      (data) => {
        callback({
          room: this.deserialize(Room)(data.room),
          mediaData: data.mediaData,
        });
      }
    );
  }

  listenEndRoom(callback: (data: { isConferenceOver: boolean }) => void) {
    return this.listen<{ isRoomClosed: boolean }>(
      VideoChatAction.CLOSE_ROOM,
      (data) => callback({ isConferenceOver: data.isRoomClosed })
    );
  }

  listenLeaveRoom(callback: (data: { room: IRoom }) => void) {
    return this.listen<{ room: IRoom }>(VideoChatAction.LEAVE_ROOM, (data) => {
      callback({
        room: this.deserialize(Room)(data.room),
      });
    });
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

export const conferenceWsTransport = new ConferenceWsTransport();
