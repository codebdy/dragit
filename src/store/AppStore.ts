import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"
import { ThemeSettings } from "./ThemeSettings";

export class AppStore{
  leftDrawer: LeftDrawer = new LeftDrawer();
  themeSettings: ThemeSettings = new ThemeSettings();
  constructor() {
    makeAutoObservable(this)
  }

}