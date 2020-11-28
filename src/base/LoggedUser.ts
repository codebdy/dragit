import { IMedia } from "./Model/IMedia";

export interface IUser{
  id:number,
  login_name:string,
  avatar:IMedia,
}

export class LoggedUser{
  meta:IUser;

  constructor(user: IUser){
    this.meta = user;
  }

  authCheck(authSlug:string) {
    return false;
  }
}