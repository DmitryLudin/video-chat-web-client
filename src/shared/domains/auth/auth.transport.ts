import { BaseTransport } from 'core/base-transport/base-transport';
import { ILogInDto, IRegisterDto } from 'shared/domains/auth/dto';
import { User } from 'shared/domains/user/user.model';

export class AuthTransport extends BaseTransport {
  constructor() {
    super('authentication');
  }

  authenticate() {
    return this.get<User>(this.basePath).then(this.deserialize(User));
  }

  register(data: IRegisterDto) {
    return this.post<User>(`${this.basePath}/register`, data).then(
      this.deserialize(User)
    );
  }

  logIn(data: ILogInDto) {
    return this.post<User>(`${this.basePath}/log-in`, data).then(
      this.deserialize(User)
    );
  }

  logOut() {
    return this.post(`${this.basePath}/log-out`);
  }
}

export const authTransport = new AuthTransport();
