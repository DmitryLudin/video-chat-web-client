import { Store } from 'core';

type TSidebarStore = {
  isChatOpen: boolean;
  isMembersListOpen: boolean;
};

const initialSidebarState: TSidebarStore = {
  isChatOpen: true,
  isMembersListOpen: false,
};

class UiSidebarService {
  private readonly _store = new Store<TSidebarStore>(initialSidebarState);

  get store() {
    return this._store.getStore();
  }

  onToggleChat = () => {
    const isChatOpen = this._store.getStore().isChatOpen;
    this._store.updateStoreValue('isChatOpen', !isChatOpen);
  };

  onToggleMembers = () => {
    const isMembersOpen = this._store.getStore().isMembersListOpen;
    this._store.updateStoreValue('isMembersListOpen', !isMembersOpen);
  };

  onSetSidebarOpen = (value: boolean) => {
    this._store.updateStore({ isChatOpen: value, isMembersListOpen: false });
  };

  get isSidebarOpen() {
    const { isChatOpen, isMembersListOpen } = this._store.getStore();
    return isChatOpen || isMembersListOpen;
  }
}

export const uiSidebarService = new UiSidebarService();
