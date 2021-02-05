import { sleep } from "../../utils/sleep";
import articleChannels from "./articleChannelsData";

export const postChannelTree = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return articleChannels
}

export const savePostChannelTree= async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  console.log('mock savePostChannelTree', args);
  return args.tree;
}


export const postChannelQueryResolvers = {
  postChannelTree
}

export const postChannelMutationResolvers = {
  savePostChannelTree
}