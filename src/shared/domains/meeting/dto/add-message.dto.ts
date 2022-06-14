export interface IAddMessageDto {
  text: string;
  roomId: string;
  memberId: string;
  replyMessageId?: string;
}
