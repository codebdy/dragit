import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"
import { ThemeSettings } from "./ThemeSettings";
import { Designer } from "./Designer";
import { IUser } from "base/Model/IUser";

export class Error{
  message?:string;
  details?:string;
  constructor() {
    makeAutoObservable(this)
  }
}

export class AppStore{
  showThemeSettings = false;
  toolbarElevate = true;
  token:string = "";
  loggedUser: IUser|undefined = undefined;
  leftDrawer: LeftDrawer = new LeftDrawer();
  themeSettings: ThemeSettings = new ThemeSettings();
  designer:Designer = new Designer();
  successAlert: boolean|string = false;
  error: Error = new Error();

  moduleSlug: string|undefined = 'dashboard';
  pageId: string|undefined;

  constructor() {
    makeAutoObservable(this)
  }

  setToolbarElevate(show:boolean){
    this.toolbarElevate = show;
  }

  openShowThemeSettings(){
    this.showThemeSettings = true
  }

  closeShowThemeSettings(){
    this.showThemeSettings = false
  }

  setSuccessAlert(alert:boolean|string){
    this.successAlert = alert;
  }

  infoError(message:string|undefined, details?:string){
    this.error.message = message;
    this.error.details = details;
  }

  clearError(){
    this.error.message = undefined;
    this.error.details = undefined;
  }

  setLoggedUser(user:IUser|undefined){
    this.loggedUser = user;
  }

  setToken(token:string){
    this.token = token;
  }

  showModule(moduleSlug:string, pageSlug?:string){
    this.moduleSlug = moduleSlug;
    this.pageId = pageSlug;
  }

}