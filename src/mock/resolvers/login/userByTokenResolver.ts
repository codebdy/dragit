import { getUser } from "mock/getUser";
import { sleep } from "../sleep";

export const userByTokenResolver = async(parent:any, args:any, context:any, info:any) => {
  await sleep(1000);
  return getUser(args.token);
}