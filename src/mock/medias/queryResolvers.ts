import { sleep } from "mock/utils/sleep";
import mediaFolders from "./mediaFolders";
import medias from "./medias";

export const mediaFoldersTreeResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return mediaFolders;
}

export const mediasResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return {
    data:medias, 
    paginatorInfo:{
      hasMorePages:true,
      currentPage:1
    }
  }
}

export const mediaQueryResolvers = {
  mediaFoldersTree:mediaFoldersTreeResolver,
  medias:mediasResolver
}
