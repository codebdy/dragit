import { sleep } from "mock/utils/sleep";
import usersData from "./data";

var idSeed = 1000;

export const rxUser = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('get rxUser', args)
  for(var i = 0; i < usersData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(usersData[i].id == args.id){
      //console.log()
      return usersData[i];
    }
  }

  return 
}

export const rxUsers = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  console.log('mock return users',{data:usersData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}})
  return {data:usersData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}


export const updateRxUsers = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  //const module = getModuleBySlug(args.slug);
  return usersData
}

export const saveRxUser = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  //const module = getModuleBySlug(args.slug);
  
  let user = {...args.user, id:args.user?.id || idSeed++, created_at:''}
  if(user?.seoMeta && !user?.seoMeta.id){
    user.seoMeta.id = ++idSeed;
  }
  console.log('Server received user data:', user);
  return user;
}

export const userQueryResolvers = {
  rxUser,
  rxUsers,
}


export const userMutationResolvers = {
  updateRxUsers,
  saveRxUser
}