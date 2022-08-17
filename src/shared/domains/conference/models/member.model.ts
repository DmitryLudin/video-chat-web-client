import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IRoom, Room } from 'shared/domains/conference/models/room.model';
import { IUser, User } from 'shared/domains/user/user.model';
import 'reflect-metadata';

export interface IMember {
  id: string;
  room: IRoom;
  user: IUser;
  displayName?: string;
  isAudioOn: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
}

export class Member implements IMember {
  @IsString()
  id!: string;

  @ValidateNested()
  @Type(() => Room)
  room!: Room;

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
