import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { User } from 'shared/domains/user/user.model';

export interface IMessage {
  id: string;
  text: string;
  meetingId: string;
  author: User;
  reply: Message;
  createdAt: Date;
}

export class Message {
  @IsString()
  id!: string;

  @IsString()
  text!: string;

  @IsString()
  meetingId!: string;

  @ValidateNested()
  @Type(() => User)
  author!: User;

  @ValidateNested()
  @Type(() => User)
  reply!: Message;

  @IsDate()
  createdAt!: Date;
}
