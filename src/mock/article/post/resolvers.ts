import { articlesData } from "mock/article/post/data";
import { sleep } from "../../utils/sleep";

export const postResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  for(var i = 0; i < articlesData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(articlesData[i].id == args.id){
      return articlesData[i];
    }
  }
  return 
}

export const postsResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return {data:articlesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}


export const updatePostsResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  //const module = getModuleBySlug(args.slug);
  return articlesData
}