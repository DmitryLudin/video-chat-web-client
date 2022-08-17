import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { Member } from 'shared/domains/conference/models/member.model';

export interface IMessage {
  id: string;
  text: string;
  roomId: string;
  author: Member;
  reply: Message;
  createdAt: string;
}

export class Message implements IMessage {
  @IsString()
  id!: string;

  @IsString()
  text!: string;

  @IsString()
  roomId!: string;

  @ValidateNested()
  @Type(() => Member)
  author!: Member;

  @ValidateNested()
  @Type(() => Message)
  reply!: Message;

  @IsDate()
  createdAt!: string;
}
