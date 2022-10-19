import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { IMember, Member } from 'shared/domains/conference/models/member.model';
import { IUser, User } from 'shared/domains/user/user.model';

export interface IRoom {
  id: string;
  owner: IUser;
  members: IMember[];
}

export class Room implements IRoom {
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
