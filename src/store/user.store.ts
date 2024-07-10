import { ICurrentUserCoreResponse } from '@/interfaces';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  userContext: ICurrentUserCoreResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserContext(userContext: ICurrentUserCoreResponse) {
    this.userContext = userContext;
  }
}

export const userStore = new UserStore();