import { LeftDrawer } from "./LeftDrawer";
import { makeAutoObservable } from "mobx"
import { ThemeSettings } from "./ThemeSettings";
import { Designer } from "./Designer";
import { IUser } from "base/Model/IUser";

export class AppStore{
  loading:boolean = false;
  token:string = "";
  loggedUser: IUser|undefined = undefined;
  leftDrawer: LeftDrawer = new LeftDrawer();
  themeSettings: ThemeSettings = new ThemeSettings();
  designer:Designer = new Designer();
  successAlert: boolean|string = false;
  errorMessage: string|undefined = '';

  constructor() {
    makeAutoObservable(this)
  }

  setLoading(loading:boolean){
    this.loading = loading;
  }

  setSuccessAlert(alert:boolean|string){
    this.successAlert = alert;
  }

  setErrorMessage(message:string|undefined){
    this.errorMessage = message;
  }

  setLoggedUser(user:IUser|undefined){
    this.loggedUser = user;
  }

  setToken(token:string){
    this.token = token;
  }

}