import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IMeeting, Meeting } from 'shared/domains/meeting/models/meeting.model';
import { IUser, User } from 'shared/domains/user/user.model';
import 'reflect-metadata';

export interface IMember {
  id: number;
  meeting: IMeeting;
  user: IUser;
  displayName?: string;
  isAudioOn: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
}

export class Member implements IMember {
  @IsNumber()
  id!: number;

  @ValidateNested()
  @Type(() => Meeting)
  meeting!: Meeting;

  @IsString()
  @IsOptional()
  displayName?: string;

  @ValidateNested()
  @Type(() => User)
  user!: User;

  @IsBoolean()
  isAudioOn!: boolean;

  @IsBoolean()
  isSpeaking!: boolean;

  @IsBoolean()
  isVideoOn!: boolean;
}
