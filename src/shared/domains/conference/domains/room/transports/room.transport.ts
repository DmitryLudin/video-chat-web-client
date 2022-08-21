import { BaseTransport } from 'core/base-transport';
import { Room } from 'shared/domains/conference/models';
import {
  ICreateRoomDto,
  IJoinRoomDto,
} from 'shared/domains/conference/types/room-dto.types';

export class RoomTransport extends BaseTransport {
  constructor() {
    super('conferences');
  }

  getByUserId(roomId: string, userId: number) {
    return this.get(`${this.basePath}/${roomId}/${userId}`).then(
      this.deserialize(Room)
    );
  }

  create(data: ICreateRoomDto) {
    return this.post(`${this.basePath}/create`, data).then(
      this.deserialize(Room)
    );
  }

  joinRoom(roomId: string, data: IJoinRoomDto) {
    return this.post(`${this.basePath}/${roomId}/join`, data).then(
      this.deserialize(Room)
    );
  }
}

export const roomTransport = new RoomTransport();
