import { articlesData } from "mock/resolvers/post/articlesData";
import { sleep } from "../sleep";

export const postsResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return {data:articlesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}