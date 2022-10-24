import {
  chatService,
  ChatService,
  mediaDataService,
  MediaDataService,
  RoomService,
  roomService,
} from 'shared/domains/conference/domains';
import { ISendMessageDto } from 'shared/domains/conference/types/chat-dto.types';
import {
  ICreateRoomDto,
  IJoinRoomDto,
} from 'shared/domains/conference/types/room-dto.types';
import { isRoomGuard } from 'shared/domains/conference/utils/guards.util';

class ConferenceService {
  get roomStore() {
    return this.roomService.store;
  }

  get chatStore() {
    return this.chatService.store;
  }

  get mediaDataStore() {
    return this.mediaDataService.store;
  }

  get localStreamService() {
    return this.mediaDataService.getLocalStreamService();
  }

  constructor(
    private readonly roomService: RoomService,
    private readonly chatService: ChatService,
    private readonly mediaDataService: MediaDataService
  ) {}

  /* Комната Конференции */
  getRoomByUserId(roomId: string, userId: number) {
    return this.roomService.getByUserId(roomId, userId);
  }

  async createRoom(data: ICreateRoomDto) {
    const room = await this.roomService.create(data);
    const selfMember = this.roomService.selfMember;

    if (isRoomGuard(room) && selfMember) {
      await this.mediaDataService.createMediaData(room.id, {
        memberId: selfMember.id,
      });
    }

    return room;
  }

  async joinRoom(roomId: string, data: IJoinRoomDto) {
    const room = await this.roomService.join(roomId, data);
    const selfMember = this.roomService.selfMember;

    if (isRoomGuard(room) && selfMember) {
      await this.mediaDataService.addMediaStream(room.id, {
        memberId: selfMember.id,
      });
    }

    return room;
  }

  /* Чат */
  sendMessage(data: ISendMessageDto) {
    return this.chatService.sendMessage(data);
  }

  /* WebSocket */
  connect() {
    this.roomService.connect();
    this.chatService.connect();
    this.mediaDataService.connect();
  }

  disconnect() {
    this.roomService.disconnect();
    this.chatService.disconnect();
    this.mediaDataService.disconnect();
  }

  reset() {
    this.roomService.reset();
    this.chatService.reset();
    this.mediaDataService.reset();
  }
}

export const conferenceService = new ConferenceService(
  roomService,
  chatService,
  mediaDataService
);
