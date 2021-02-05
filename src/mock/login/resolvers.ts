import { getUser } from "mock/user/getUser";
import { sleep } from "../utils/sleep";
import { login } from "./login";

export const loginResolver = async(parent:any, args:any, context:any, info:any)=>{
  //console.log("Login mock", parent, context, info,  args);
  await sleep(1000);
  const user = login(args.login_name, args.password);
  return {user, token:user.login_name};
}

export const userByTokenResolver = async(parent:any, args:any, context:any, info:any) => {
  await sleep(1000);
  return getUser(args.token);
}