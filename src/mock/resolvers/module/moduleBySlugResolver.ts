import { getModuleBySlug } from "mock/modules/getModuleBySlug";
import { sleep } from "../sleep";

export const moduleBySlugResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(1000);
  const module = getModuleBySlug(args.slug);
  return module
}