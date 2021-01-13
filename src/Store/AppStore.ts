import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"
import { ThemeSettings } from "./ThemeSettings";
import { DesignerStore } from "./DesignerStore";
import { IUser } from "Base/Model/IUser";
import { IModule } from "Base/Model/IModule";

export class Error{
  message?:string;
  details?:string;
  constructor() {
    makeAutoObservable(this)
  }
}

export class Confirm{
  message?:string;
  callbackFn?:()=>void;
  constructor() {
    makeAutoObservable(this)
  }

  open(message:string, callbackFn:()=>void){
    this.message = message;
    this.callbackFn = callbackFn;
  }

  close(){
    this.message = undefined;
    this.callbackFn = undefined;
  }
}

export class AppStore{
  showThemeSettings = false;
  toolbarElevate = true;
  token:string = "";
  loggedUser: IUser|undefined = undefined;
  leftDrawer: LeftDrawer = new LeftDrawer();
  themeSettings: ThemeSettings = new ThemeSettings();
  designer:DesignerStore = new DesignerStore();
  successAlert: boolean|string = false;
  error: Error = new Error();
  confirm: Confirm = new Confirm();

  moduleSlug: string|undefined = 'dashboard';
  pageId: string|undefined;

  module?:IModule;

  constructor() {
    makeAutoObservable(this)
  }

  setModule(module?:IModule){
    this.module = module;
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

  confirmAction(message:string, actionCallback:()=>void){
    this.confirm.open(message, actionCallback);
  }

}