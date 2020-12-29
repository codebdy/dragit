import { sleep } from "mock/utils/sleep";
import mediaFolders from "./mediaFolders";

export const mediaFoldersTreeResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return mediaFolders
}

export const mediaResolvers = {
  mediaFoldersTree:mediaFoldersTreeResolver
}