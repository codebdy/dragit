import users from "mock/data/users";
import { addAuthsToUser } from "./addAuthsToUser";

export function login(account:string, password:string){
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