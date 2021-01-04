import { getPageById } from "mock/modules/getPageById";
import { sleep } from "../utils/sleep";

export const pageResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(1000);
  const page = getPageById(args.id);
  console.log('mock page', page, args);
  return page
}