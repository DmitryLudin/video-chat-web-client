export interface ISendMessageDto {
  text: string;
  roomId: string;
  memberId: string;
  replyMessageId?: string;
}

export interface IGetMessagesDto {
  roomId: string;
}
