import { createId } from "Base/creatId";
import { sleep } from "../../utils/sleep";
import attributesData from "./attributesData";

const allPostAttributes = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return attributesData
}

export const postAttribute = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('get postAttribute', args)
  for(var i = 0; i < attributesData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(attributesData[i].id == args.id){
      //console.log()
      return attributesData[i];
    }
  }

  return 
}


export const postAttributes = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return {data:attributesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const removePostAttributes = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('removePostAttributes', args)
  return attributesData
}

export const updatePostAttributes = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('updatePostAttributes', args)
  return attributesData
}

export const savePostAttribute = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  console.log('Server received tag data:', args);
  let tag = {...args.postAttribute, id:args.postAttribute?.id || createId(), created_at:''}
  return tag;
}



export const postAttributesQueryResolvers = {
  allPostAttributes,
  postAttributes,
  postAttribute
}

export const postAttributeMutationResolvers = {
  removePostAttributes,
  updatePostAttributes,
  savePostAttribute
}