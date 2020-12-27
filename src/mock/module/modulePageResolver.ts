import { getModulePage } from "mock/modules/getModulePage";
import { sleep } from "../utils/sleep";

export const modulePageResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(1000);
  const page = getModulePage(args.moduleSlug, args.pageSlug);
  return page
}