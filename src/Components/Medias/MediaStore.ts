import { makeAutoObservable } from "mobx";

export class MediaStore{
  constructor() {
    makeAutoObservable(this)
  }
}