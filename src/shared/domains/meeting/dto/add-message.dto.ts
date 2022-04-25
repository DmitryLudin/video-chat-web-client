export interface IAddMessageDto {
  text: string;
  meetingId: string;
  userId: number;
  replyMessageId?: string;
}
