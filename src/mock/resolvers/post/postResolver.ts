import { articlesData } from "mock/resolvers/post/articlesData";
import { sleep } from "../sleep";

export const postResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  for(var i = 0; i < articlesData.length; i++){
    if(articlesData[i].id === args.id){
      return articlesData[i];
    }
  }
  return 
}