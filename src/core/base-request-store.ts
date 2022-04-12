import { Store } from 'core/base-store';
import { TRequestError } from 'core/base-transport/types';
import { action } from 'mobx';

type TRequestStore = {
  isLoading: boolean;
  error?: TRequestError;
};

const initialRequestStore: TRequestStore = {
  isLoading: false,
};

export class RequestStore<T> extends Store<T & TRequestStore> {
  constructor(initialState: T) {
    super({ ...initialRequestStore, ...initialState });
  }

  @action
  setLoading(value: boolean) {
    this.state.isLoading = value;
  }

  @action
  setError = (error?: TRequestError) => {
    this.state.error = error;
  };
}
