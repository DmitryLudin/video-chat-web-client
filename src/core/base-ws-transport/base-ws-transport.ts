import { ClassConstructor, plainToInstance } from 'class-transformer';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { Socket, io } from 'socket.io-client';

const baseWsUrl = WS_HOST;

export class WsTransport {
  protected socket!: Socket | null;

  constructor(private readonly namespace?: string) {}

  connect(callback?: () => void) {
    const url = this.namespace ? `${baseWsUrl}/${this.namespace}` : baseWsUrl;

    this.socket = io(url, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      callback && callback();
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  send<T>(event: string, data: T): void | Error {
    if (!this.socket) {
      return new Error('Соединение с сервером не установлено');
    }

    this.socket.emit(event, data);
  }

  listen<T>(event: string, callback: TWsTransportCallback<T>): void | Error {
    if (!this.socket) {
      return new Error('Соединение с сервером не установлено');
    }

    this.socket.on(event, (data: T) => {
      callback(data);
    });
  }

  protected deserialize<T>(
    model: ClassConstructor<T>,
    callback: TWsTransportCallback<T>
  ) {
    return (data: T) => callback(plainToInstance(model, data));
  }

  protected deserializeArray<T>(
    model: ClassConstructor<T>,
    callback: TWsTransportCallback<T[]>
  ) {
    return (data: Array<T>) =>
      callback(
        Array.isArray(data)
          ? data.map((item) => plainToInstance(model, item))
          : []
      );
  }
}
