import { BaseTransport } from 'core/base-transport';
import { ICreateMeetingDto, IJoinMeetingDto } from 'shared/domains/meeting/dto';
import { Meeting } from 'shared/domains/meeting/models/meeting.model';

export class MeetingTransport extends BaseTransport {
  constructor() {
    super('meetings');
  }

  create(meetingData: ICreateMeetingDto) {
    return this.post(`${this.basePath}/create`, meetingData).then(
      this.deserialize(Meeting)
    );
  }

  joinMeeting(meetingId: string, joinMeetingData: IJoinMeetingDto) {
    return this.post(
      `${this.basePath}/${meetingId}/join-meeting`,
      joinMeetingData
    ).then(this.deserialize(Meeting));
  }

  getByUserId(meetingId: string, userId: number) {
    return this.get(`${this.basePath}/${meetingId}/${userId}`).then(
      this.deserialize(Meeting)
    );
  }
}

export const meetingTransport = new MeetingTransport();
