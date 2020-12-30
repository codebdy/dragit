import { articlesData } from "mock/article/post/data";
import { sleep } from "../../utils/sleep";

var idSeed = 1000;

export const post = async (parent:any, args:any, context:any, info:any)=>{
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

export const posts = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return {data:articlesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}


export const updatePosts = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  //const module = getModuleBySlug(args.slug);
  return articlesData
}

export const savePost = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  //const module = getModuleBySlug(args.slug);
  console.log('Server received post data:', args);
  return {...args.post, id:args.post?.id || idSeed++, created_at:''}
}

export const postQueryResolvers = {
  post,
  posts,
}


export const postMutationResolvers = {
  updatePosts,
  savePost
}