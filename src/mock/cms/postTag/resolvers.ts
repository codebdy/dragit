import createId from "rx-drag/utils/createId";
import { sleep } from "../../utils/sleep";
import tagsData from "./tagsData";

export const allPostTags = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return tagsData
}

export const postTag = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('get postTag', args)
  for(var i = 0; i < tagsData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(tagsData[i].id == args.id){
      //console.log()
      return tagsData[i];
    }
  }

  return 
}


export const postTags = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return {data:tagsData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const removePostTags = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('removePostTags', args)
  return tagsData
}

export const updatePostTags = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('updatePostTags', args)
  return tagsData
}

export const savePostTag = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  console.log('Server received tag data:', args);
  let tag = {...args.postTag, id:args.postTag?.id || createId(), created_at:''}
  return tag;
}


export const postTagQueryResolvers = {
  allPostTags,
  postTags,
  postTag
}

export const postTagMutationResolvers = {
  removePostTags,
  updatePostTags,
  savePostTag
}