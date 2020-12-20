import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"

export class AppStore{
  leftDrawer:LeftDrawer = new LeftDrawer();
  constructor() {
    makeAutoObservable(this)
  }

}