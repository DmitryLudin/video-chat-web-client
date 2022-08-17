import { AxiosResponse } from 'axios';
import { BaseTransport } from 'core/base-transport';
import {
  IConnectMediaStreamDto,
  ICreateConferenceDto,
  IJoinConferenceDto,
  IReceiveTrackDto,
  IReceiveTrackRequestDto,
  IResumeReceiveTrackRequestDto,
  ISendTrackRequestDto,
} from 'shared/domains/conference/dto';
import { ISendTrackDto } from 'shared/domains/conference/dto/send-track.dto';
import { Room } from 'shared/domains/conference/models/room.model';

export class ConferenceTransport extends BaseTransport {
  constructor() {
    super('conferences');
  }

  create(roomData: ICreateConferenceDto) {
    return this.post(`${this.basePath}/create`, roomData).then(
      this.deserialize(Room)
    );
  }

  joinRoom(roomId: string, joinRoomData: IJoinConferenceDto) {
    return this.post(`${this.basePath}/${roomId}/join`, joinRoomData).then(
      this.deserialize(Room)
    );
  }

  getByUserId(roomId: string, userId: number) {
    return this.get(`${this.basePath}/${roomId}/${userId}`).then(
      this.deserialize(Room)
    );
  }

  connectMediaStream(roomId: string, data: IConnectMediaStreamDto) {
    return this.post(
      `${this.basePath}/${roomId}/connect-media-stream`,
      data
    ).then(() => ({ connected: true }));
  }

  createMediaStreamProducer(roomId: string, data: ISendTrackRequestDto) {
    return this.post(
      `${this.basePath}/${roomId}/media-stream-producer`,
      data
    ).then(
      (response: AxiosResponse<{ track: ISendTrackDto }>) => response.data
    );
  }

  createMediaStreamConsumer(roomId: string, data: IReceiveTrackRequestDto) {
    return this.post(
      `${this.basePath}/${roomId}/media-stream-consumer`,
      data
    ).then(
      (response: AxiosResponse<{ track: IReceiveTrackDto }>) => response.data
    );
  }

  resumeMediaStreamConsumer(
    roomId: string,
    data: IResumeReceiveTrackRequestDto
  ) {
    return this.post(
      `${this.basePath}/${roomId}/media-stream-consumer/resume`,
      data
    ).then(() => ({ resumed: true }));
  }
}

export const conferenceTransport = new ConferenceTransport();
