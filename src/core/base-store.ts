import { action, makeObservable, observable } from 'mobx';

export class Store<T extends object> {
  @observable protected state: T;
  private readonly initialState: T;

  constructor(initialState: T) {
    this.state = initialState;
    this.initialState = initialState;

    makeObservable(this);
  }

  getStore() {
    return this.state;
  }

  getStoreValue<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  @action
  setStore(state: T) {
    this.state = state;
  }

  @action
  updateStore(state: Partial<T> | ((prevState: T) => Partial<T>)): void {
    const newState = typeof state === 'function' ? state(this.state) : state;
    this.state = { ...this.state, ...newState };
  }

  @action
  updateStoreValue<K extends keyof T>(key: K, value: T[K]) {
    this.state[key] = value;
  }

  @action
  resetStore() {
    this.state = this.initialState;
  }
}
