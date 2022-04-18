import { Socket, io } from 'socket.io-client';

const { REACT_APP_API_WS_URL } = process.env;

const baseWsUrl = REACT_APP_API_WS_URL as string;

export class WsTransport {
  protected socket!: Socket | null;

  connect(callback: () => void) {
    this.socket = io(baseWsUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      console.log(this.socket?.connected);
      callback();
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

  listen<T>(event: string, callback: (data: T) => void): void | Error {
    if (!this.socket) {
      return new Error('Соединение с сервером не установлено');
    }

    this.socket.on(event, (data: T) => {
      callback(data);
    });
  }
}
