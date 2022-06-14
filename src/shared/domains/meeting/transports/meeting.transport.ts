import { AxiosResponse } from 'axios';
import { BaseTransport } from 'core/base-transport';
import {
  IConnectMediaStreamDto,
  ICreateMeetingDto,
  IJoinMeetingDto,
  IReceiveTrackDto,
  IReceiveTrackRequestDto,
  IResumeReceiveTrackRequestDto,
  ISendTrackRequestDto,
} from 'shared/domains/meeting/dto';
import { ISendTrackDto } from 'shared/domains/meeting/dto/send-track.dto';
import { Meeting } from 'shared/domains/meeting/models/meeting.model';

export class MeetingTransport extends BaseTransport {
  constructor() {
    super('video-chat/room');
  }

  create(meetingData: ICreateMeetingDto) {
    return this.post(`${this.basePath}/create`, meetingData).then(
      this.deserialize(Meeting)
    );
  }

  joinMeeting(meetingId: string, joinMeetingData: IJoinMeetingDto) {
    return this.post(
      `${this.basePath}/${meetingId}/join`,
      joinMeetingData
    ).then(this.deserialize(Meeting));
  }

  getByUserId(meetingId: string, userId: number) {
    return this.get(`${this.basePath}/${meetingId}/${userId}`).then(
      this.deserialize(Meeting)
    );
  }

  connectMediaStream(meetingId: string, data: IConnectMediaStreamDto) {
    return this.post(
      `${this.basePath}/${meetingId}/connect-media-stream`,
      data
    ).then(() => ({ connected: true }));
  }

  sendTrack(meetingId: string, data: ISendTrackRequestDto) {
    return this.post(`${this.basePath}/${meetingId}/send-track`, data).then(
      (response: AxiosResponse<{ track: ISendTrackDto }>) => response.data
    );
  }

  receiveTrack(meetingId: string, data: IReceiveTrackRequestDto) {
    return this.post(`${this.basePath}/${meetingId}/receive-track`, data).then(
      (response: AxiosResponse<{ track: IReceiveTrackDto }>) => response.data
    );
  }

  resumeReceiveTrack(meetingId: string, data: IResumeReceiveTrackRequestDto) {
    return this.post(
      `${this.basePath}/${meetingId}/resume-receive-track`,
      data
    ).then(() => ({ resumed: true }));
  }
}

export const meetingTransport = new MeetingTransport();
