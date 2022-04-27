import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { Member } from 'shared/domains/meeting/models/member.model';

export interface IMessage {
  id: string;
  text: string;
  meetingId: string;
  author: Member;
  reply: Message;
  createdAt: string;
}

export class Message {
  @IsString()
  id!: string;

  @IsString()
  text!: string;

  @IsString()
  meetingId!: string;

  @ValidateNested()
  @Type(() => Member)
  author!: Member;

  @ValidateNested()
  @Type(() => Message)
  reply!: Message;

  @IsDate()
  createdAt!: string;
}
