export interface ICreateRoomDto {
  ownerId: number;
}

export interface IJoinRoomDto {
  userId: number;
  displayName?: string;
}
