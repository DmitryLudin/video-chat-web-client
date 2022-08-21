import {
  chatService,
  ChatService,
  RoomService,
  roomService,
} from 'shared/domains/conference/domains';
import {
  IGetMessagesDto,
  ISendMessageDto,
} from 'shared/domains/conference/types/chat-dto.types';
import {
  ICreateRoomDto,
  IJoinRoomDto,
} from 'shared/domains/conference/types/room-dto.types';

class ConferenceService {
  get roomStore() {
    return this.roomService.store;
  }

  get chatStore() {
    return this.chatService.store;
  }

  constructor(
    private readonly roomService: RoomService,
    private readonly chatService: ChatService // private readonly mediaDataService: MediaDataService
  ) {}

  /* Комната Конференции */
  getRoomByUserId(roomId: string, userId: number) {
    return this.roomService.getByUserId(roomId, userId);
  }

  createRoom(data: ICreateRoomDto) {
    return this.roomService.create(data);
  }

  joinRoom(roomId: string, data: IJoinRoomDto) {
    return this.roomService.join(roomId, data);
  }

  /* Чат */
  geRoomMessages(data: IGetMessagesDto) {
    return this.chatService.getMessages(data);
  }

  sendMessage(data: ISendMessageDto) {
    return this.chatService.sendMessage(data);
  }

  /* WebSocket */
  connect() {
    this.roomService.connect();
    this.chatService.connect();
  }

  disconnect() {
    this.roomService.disconnect();
    this.chatService.disconnect();
  }

  reset() {
    this.roomService.reset();
    this.chatService.reset();
  }
}

export const conferenceService = new ConferenceService(
  roomService,
  chatService
);
