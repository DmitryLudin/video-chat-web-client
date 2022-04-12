import { Store } from 'core';
import { IUser } from 'shared/domains/user/user.model';

type TUserStore = {
  user: IUser | null;
};

const initialUserState: TUserStore = {
  user: null,
};

export class UserService {
  private readonly _store = new Store<TUserStore>(initialUserState);

  get store() {
    return this._store.getStore();
  }

  setUser(userData: IUser | null) {
    this._store.updateStore({ user: userData });
  }
}

export const userService = new UserService();
