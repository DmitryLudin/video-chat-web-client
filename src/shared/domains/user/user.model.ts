import { IsNumber, IsOptional, IsString } from 'class-validator';

export interface IUser {
  id: number;
  username: string;
  displayName?: string | null;
}

export class User implements IUser {
  @IsNumber()
  id!: number;

  @IsString()
  username!: string;

  @IsString()
  @IsOptional()
  displayName?: string | null;
}
