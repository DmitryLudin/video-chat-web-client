import { WsTransport } from 'core/base-ws-transport';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { ChatEventEnum } from 'shared/domains/conference/constants';
import { IMessage, Message } from 'shared/domains/conference/models';
import {
  IGetMessagesDto,
  ISendMessageDto,
} from 'shared/domains/conference/types/chat-dto.types';

export class ChatWsTransport extends WsTransport {
  constructor() {
    super('chat');
  }

  listenMessages(callback: TWsTransportCallback<IMessage[]>) {
    return this.listen(
      ChatEventEnum.GET_MESSAGES,
      this.deserializeArray(Message, callback)
    );
  }

  listenMessage(callback: TWsTransportCallback<IMessage>) {
    return this.listen(
      ChatEventEnum.GET_MESSAGE,
      this.deserialize(Message, callback)
    );
  }

  sendMessage(data: ISendMessageDto) {
    return this.send(ChatEventEnum.SEND_MESSAGE, data);
  }

  getMessages(data: IGetMessagesDto) {
    return this.send(ChatEventEnum.GET_MESSAGES, data);
  }
}

export const chatWsTransport = new ChatWsTransport();