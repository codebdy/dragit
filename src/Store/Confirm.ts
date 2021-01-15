import { makeAutoObservable } from "mobx";


export class Confirm {
  message?: string;
  callbackFn?: () => void;
  constructor() {
    makeAutoObservable(this);
  }

  open(message: string, callbackFn: () => void) {
    this.message = message;
    this.callbackFn = callbackFn;
  }

  close() {
    this.message = undefined;
    this.callbackFn = undefined;
  }
}
