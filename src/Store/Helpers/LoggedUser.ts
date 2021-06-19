import { ID } from "rx-drag/models/baseTypes";
import { IUser } from "../../Base/Model/IUser";

export class LoggedUser{
  meta?:IUser;

  constructor(user: IUser|undefined){
    this.meta = user;
  }

  authCheck(...auths:ID[]) {
    if(!this.meta || !this.meta.loginName){
      return false;
    }

    if(this.meta.isSupper || this.meta.isDemo){
      return true;
    }
    if(!auths || !this.meta.auths){
      return false;
    }
    for(var i = 0; i < auths.length; i++){
      let auth = auths[i]
      for(var j = 0; j < this.meta.auths.length; j++){
        if(auth ===  this.meta.auths[j]){
          return true;
        }
      }
    }
    return false;
  }
}