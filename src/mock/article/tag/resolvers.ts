import { sleep } from "../../utils/sleep";
import tagsData from "./tagsData";

export const allPostTagsResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return tagsData
}
