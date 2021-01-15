import { makeAutoObservable } from "mobx";

export class Error {
  message?: string;
  details?: string;
  constructor() {
    makeAutoObservable(this);
  }
}
