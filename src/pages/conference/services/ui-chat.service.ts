import { Store } from 'core';
import { IMessage } from 'shared/domains/conference/models';

type TStore = {
  replyMessage: IMessage | null;
};

const initialState: TStore = {
  replyMessage: null,
};

class UiChatService {
  private readonly _store = new Store<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  selectReplyMessage(message: IMessage | null) {
    this._store.updateStore({ replyMessage: message });
  }

  resetStore = () => {
    this._store.resetStore();
  };
}

export const uiChatService = new UiChatService();
