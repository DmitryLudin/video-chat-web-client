import { makeAutoObservable } from 'mobx';

export class Store<T extends object> {
  private state: T;
  private readonly initialState: T;

  constructor(initialState: T) {
    this.state = initialState;
    this.initialState = initialState;
    makeAutoObservable(this);
  }

  getStore() {
    return this.state;
  }

  setStore(state: T) {
    this.state = state;
  }

  updateStore(state: T) {
    this.state = { ...this.state, ...state };
  }

  getStoreValue<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  updateStoreValue<K extends keyof T>(key: K, value: T[K]) {
    this.state[key] = value;
  }

  resetStore() {
    this.state = this.initialState;
  }
}
