import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  isRequestError,
  TDeserializeArrayReturn,
  TDeserializeReturn,
  THttpMethod,
  TRequestError,
  TResponse,
} from 'core/base-transport/types';

const { REACT_APP_API_URL } = process.env;

export abstract class BaseTransport {
  protected readonly basePath: string;

  protected constructor(basePath: string) {
    this.basePath = basePath;
  }

  protected get<TResponse>(path: string) {
    return this.request<TResponse>('GET', path);
  }

  protected post<TResponse>(path: string, data?: unknown) {
    return this.request<TResponse>('POST', path, data);
  }

  protected deserialize<T>(model: ClassConstructor<T>): TDeserializeReturn<T> {
    return (response: TResponse<T>): T => plainToInstance(model, response.data);
  }

  protected deserializeArray<T>(
    model: ClassConstructor<T>
  ): TDeserializeArrayReturn<T> {
    return (response: TResponse<Array<unknown>>): Array<T> =>
      Array.isArray(response.data)
        ? response.data.map((data) => plainToInstance(model, data))
        : [];
  }

  private request<TResponse>(
    method: THttpMethod,
    path: string,
    data?: unknown
  ) {
    return fetch(`${REACT_APP_API_URL as string}/${path}`, {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    })
      .then((response) => response.json())
      .then((data: TResponse | TRequestError) => {
        if (isRequestError(data)) {
          throw data;
        }

        return { data };
      })
      .catch((error: unknown) => {
        throw error;
      });
  }
}
