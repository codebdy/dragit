import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"
import { ThemeSettings } from "./ThemeSettings";
import { Designer } from "./Designer";

export class AppStore{
  leftDrawer: LeftDrawer = new LeftDrawer();
  themeSettings: ThemeSettings = new ThemeSettings();
  designer:Designer = new Designer();
  successAlert: boolean|string = false;
  errorMessage: string|undefined = '';

  constructor() {
    makeAutoObservable(this)
  }

  setSuccessAlert(alert:boolean|string){
    this.successAlert = alert;
  }

  setErrorMessage(message:string|undefined){
    this.errorMessage = message;
  }

}