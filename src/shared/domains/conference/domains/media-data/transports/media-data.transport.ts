import { AxiosResponse } from 'axios';
import { BaseTransport } from 'core/base-transport';
import {
  IConnectMediaStreamDto,
  ICreateMediaDataDto,
  ICreateMediaStreamConsumerDto,
  ICreateMediaStreamProducerDto,
  IMediaStreamConsumerTrack,
  IMediaStreamProducerTrack,
  IResumeMediaStreamConsumerDto,
} from 'shared/domains/conference/types/media-data-dto.types';

export class MediaDataTransport extends BaseTransport {
  constructor() {
    super('conferences/media-data');
  }

  createMediaData(roomId: string, data: ICreateMediaDataDto) {
    return this.post(`${this.basePath}/${roomId}/create`, data);
  }

  addMediaStream(roomId: string, data: ICreateMediaDataDto) {
    return this.post(`${this.basePath}/${roomId}/add-stream`, data);
  }

  connectMediaStream(roomId: string, data: IConnectMediaStreamDto) {
    return this.post(`${this.basePath}/${roomId}/connect-stream`, data);
  }

  createMediaStreamProducer(
    roomId: string,
    data: ICreateMediaStreamProducerDto
  ) {
    return this.post(
      `${this.basePath}/${roomId}/create-stream-producer`,
      data
    ).then(
      (response: AxiosResponse<IMediaStreamProducerTrack>) => response.data
    );
  }

  createMediaStreamConsumer(
    roomId: string,
    data: ICreateMediaStreamConsumerDto
  ) {
    return this.post(
      `${this.basePath}/${roomId}/create-stream-consumer`,
      data
    ).then(
      (response: AxiosResponse<IMediaStreamConsumerTrack>) => response.data
    );
  }

  resumeMediaStreamConsumer(
    roomId: string,
    data: IResumeMediaStreamConsumerDto
  ) {
    return this.post(`${this.basePath}/${roomId}/resume-stream-consumer`, data);
  }
}

export const mediaDataTransport = new MediaDataTransport();
