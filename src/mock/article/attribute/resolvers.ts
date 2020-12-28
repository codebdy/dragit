import { sleep } from "../../utils/sleep";
import attributesData from "./attributesData";

export const allPostAttributesResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return attributesData
}
