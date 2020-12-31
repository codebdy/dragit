import { articlesData } from "mock/article/post/data";
import { sleep } from "mock/utils/sleep";

export const subtract = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  return {minute:args.minute, minus:args.minus, result:args.minute - args.minus}
}

export const compound = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return {data:articlesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const splitDemoMutationResolvers = {
  subtract,
  compound
}