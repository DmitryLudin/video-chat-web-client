import { Room } from 'shared/domains/conference/models';

export function isRoomGuard(data: unknown): data is Room {
  return data instanceof Room;
}
