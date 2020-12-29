import { sleep } from "mock/utils/sleep";
var idSeed = 1;
const addMediaFolder = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return {id:'new ' + (idSeed++), parent:args.parentId ? {id:args.parentId} :null, name:'New Folder'}
}
const removeMediaFolder = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return {id:args.id}
}
const updateMediaFolder = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  console.log('updateMediaFolder mock', {...args.folder})
  return {...args.folder}
}
const removeMedias = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return [...args.ids]
}
const updateMedia = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return {...args.media}
}

export const mediaMutationResolvers = {
  addMediaFolder,
  removeMediaFolder,
  updateMediaFolder,
  removeMedias,
  updateMedia
}