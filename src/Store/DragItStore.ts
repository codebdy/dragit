import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"
import { DesignerStore } from "./DesignerStore";
import { IUser } from "Base/Model/IUser";
import { Confirm } from "./Confirm";
import { Error } from "./Error";

export class DragItStore{
  showThemeSettings = false;
  toolbarElevate = true;
  token:string = "";
  loggedUser: IUser|undefined = undefined;
  leftDrawer: LeftDrawer = new LeftDrawer();
  designer:DesignerStore = new DesignerStore();
  successAlert: boolean|string = false;
  error: Error = new Error();
  confirm: Confirm = new Confirm();

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

  confirmAction(message:string, actionCallback:()=>void){
    this.confirm.open(message, actionCallback);
  }

}