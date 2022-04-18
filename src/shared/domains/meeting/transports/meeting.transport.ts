import { BaseTransport } from 'core/base-transport';
import { ICreateMeetingDto } from 'shared/domains/meeting/dto';
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

  getById(meetingId: string) {
    return this.get(`${this.basePath}/${meetingId}`).then(
      this.deserialize(Meeting)
    );
  }
}

export const meetingTransport = new MeetingTransport();
