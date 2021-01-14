import { articlesData } from "mock/article/post/data";
import { sleep } from "../../utils/sleep";

var idSeed = 1000;

export const post = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock post', args);
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
  return {data:articlesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const removePosts = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('removePosts', args)
  return articlesData
}

export const updatePosts = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('updatePosts', args)
  return articlesData
}

export const savePost = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  console.log('Server received post data:', args);
  let post = {...args.post, id:args.post?.id || idSeed++, created_at:''}
  if(post?.seoMeta && !post?.seoMeta.id){
    post.seoMeta.id = ++idSeed;
  }
  return post;
}

export const postQueryResolvers = {
  post,
  posts,
}


export const postMutationResolvers = {
  removePosts,
  updatePosts,
  savePost
}