import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { IMember, Member } from 'shared/domains/meeting/models/member.model';
import { IUser, User } from 'shared/domains/user/user.model';
import 'reflect-metadata';

export interface IMeeting {
  id: string;
  owner: IUser;
  members: IMember[];
}

export class Meeting implements IMeeting {
  @IsString()
  id!: string;

  @ValidateNested()
  @Type(() => User)
  owner!: User;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Member)
  members!: Member[];
}
