export interface IAddMessageDto {
  text: string;
  meetingId: string;
  memberId: string;
  replyMessageId?: string;
}
