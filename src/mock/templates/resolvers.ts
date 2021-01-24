import { sleep } from "mock/utils/sleep";
import pageTemplates from "./data";

export const rxTemplates = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock rxTemplates', args);
  return pageTemplates
}


export const templateQueryResolvers = {
  rxTemplates,
}
