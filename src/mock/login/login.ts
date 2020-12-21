import { addAuthsToUser } from "./addAuthsToUser";
import { models } from "../model";

export function login(account:string, password:string){
  let users = models['/Model/User']
  if(!users){
    return undefined
  }

  for(var i = 0; i < users.length; i++){
    let user = users[i];
    if(user.login_name === account && user.password === password){
      return addAuthsToUser(user);
    }
  }
}