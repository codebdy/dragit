import { sleep } from "../../utils/sleep";
import articleChannels from "./articleChannels";

export const channelTreeResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return articleChannels
}
