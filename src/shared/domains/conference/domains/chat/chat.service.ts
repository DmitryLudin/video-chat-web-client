import { RequestStore } from 'core';
import {
  chatWsTransport,
  ChatWsTransport,
} from 'shared/domains/conference/domains/chat/chat.ws-transport';
import { IMessage } from 'shared/domains/conference/models';
import { ISendMessageDto } from 'shared/domains/conference/types/chat-dto.types';

type TStore = {
  messages: IMessage[];
};

const initialState: TStore = {
  messages: [],
};

export class ChatService {
  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(private readonly wsTransport: ChatWsTransport) {}

  connect() {
    this.wsTransport.connect();
    this.wsTransport.listenMessages((messages) =>
      this._store.updateStore({ messages })
    );
    this.wsTransport.listenMessage((message) => {
      const messages = this._store.getStoreValue('messages');
      messages.push(message);
      this._store.updateStoreValue('messages', messages);
    });
  }

  sendMessage(data: ISendMessageDto) {
    this.wsTransport.sendMessage(data);
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  reset() {
    this._store.resetStore();
  }
}

export const chatService = new ChatService(chatWsTransport);
