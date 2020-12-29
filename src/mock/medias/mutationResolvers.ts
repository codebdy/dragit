import { sleep } from "mock/utils/sleep";
var idSeed = 1;
const addMediaFolder = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return {id:'new ' + (idSeed++), parent:args.parentId ? {id:args.parentId} :null, name:'New Folder'}
}
const removeMediaFolder = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return {}
}
const updateMediaFolder = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  console.log('updateMediaFolder mock', {...args.folder})
  return {...args.folder}
}
const removeMedias = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return []
}
const updateMedia = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return {}
}

export const mediaMutationResolvers = {
  addMediaFolder,
  removeMediaFolder,
  updateMediaFolder,
  removeMedias,
  updateMedia
}