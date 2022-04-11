import { RequestStore } from 'core/base-request-store';
import { TRequestError } from 'core/base-transport/types';
import {
  authTransport,
  AuthTransport,
} from 'shared/domains/auth/auth.transport';
import { ILogInDto, IRegisterDto } from 'shared/domains/auth/dto';
import { userService, UserService } from 'shared/domains/user/user.service';

type TAuthStore = {
  isAuthorized: boolean;
};

const initialAuthState: TAuthStore = {
  isAuthorized: false,
};

class AuthService {
  private readonly _store = new RequestStore<TAuthStore>(initialAuthState);

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: AuthTransport,
    private readonly userService: UserService
  ) {}

  authenticate() {
    this.transport
      .authenticate()
      .then((user) => {
        this.userService.setUser(user);
        this._store.updateStore({ isAuthorized: true });
      })
      .catch((error: TRequestError) => {
        this._store.setError(error);
      });
  }

  logIn(userData: ILogInDto) {
    this._store.setLoading(true);

    this.transport
      .logIn(userData)
      .then((user) => {
        this.userService.setUser(user);
        this._store.updateStore({ isAuthorized: true });
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  logOut(): Promise<boolean | void> {
    return this.transport
      .logOut()
      .then(() => true)
      .catch(this._store.setError);
  }

  async register(userData: IRegisterDto) {
    try {
      this._store.setLoading(true);
      await this.transport.register(userData);
      const user = await this.transport.logIn(userData);
      this.userService.setUser(user);
      this._store.updateStoreValue('isAuthorized', true);
    } catch (error: unknown) {
      this._store.setError(error as TRequestError);
    } finally {
      this._store.setLoading(false);
    }
  }
}

export const authService = new AuthService(authTransport, userService);
