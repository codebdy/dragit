import { sleep } from "mock/utils/sleep";
import rolesData from "./rolesData";


export const allRxRoles = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  console.log('mock return allRxRoles')
  return rolesData;
}



export const roleQueryResolvers = {
  allRxRoles,
}


export const roleMutationResolvers = {

}