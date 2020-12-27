import { sleep } from "../sleep";
import { articlesData } from "./articlesData";

export const updatePostsResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  //const module = getModuleBySlug(args.slug);
  return articlesData
}