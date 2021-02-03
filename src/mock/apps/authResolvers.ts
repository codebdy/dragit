import { sleep } from "mock/utils/sleep";
import { getRxApp } from "./appResolvers";
import appsData from "./data";
import { v4 as uuidv4 } from 'uuid';
import authsData from "mock/apps/authsData";

function getRxAuth(id:string){
  for(var i = 0; i < appsData.length; i++){
    const app = appsData[i];
    if(app?.auths?.length){
      for(var j = 0; j < app.auths.length; j++){
        if(id === app.auths[j].id){
          return app.auths[j];
        }
      }      
    }

  }
}

function doRemoveRxAuth(id:string){
  for(var i = 0; i < appsData.length; i++){
    const app = appsData[i];
    if(app?.auths?.length){
      for(var j = 0; j < app.auths.length; j++){
        const auth =  app.auths[j];
        if(id === auth.id){
          app.auths = app.auths.filter(ath => auth.id !== ath.id)
          return auth;
        }
      }      
    }

  }
}

export const removeRxAuth = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('removeRxAuth', args)
  return doRemoveRxAuth(args.id)
}

export const saveRxAuth = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  console.log('Server received RxAuth data:', args);
  const oldRxAuth = getRxAuth(args.id)
  let rxAuth = {...oldRxAuth, ...args.rxAuth};
  return rxAuth;
}

export const createRxAuth = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  const app = getRxApp(args.appId)
  let auth = {id:uuidv4(), rx_slug:'new-authority', name:'新权限'} as any;
  console.log('Server createRxAuth:', args);
  if(app){
    app.auths = [...app.auths||[], auth];
  }

  return auth;
}

export const systemRxAuths = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return {data:authsData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const allRxAuths = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  let allAuths = [...authsData]

  appsData?.forEach(app=>{
    app?.auths?.forEach(auth=>{
      allAuths.push({...auth, group_name:app.name});
    })
  })
  console.log('mock return allRxAuths')
  return allAuths;
}

export const authQueryResolvers = {
  systemRxAuths,
  allRxAuths,
}


export const authMutationResolvers = {
  removeRxAuth,
  saveRxAuth,
  createRxAuth,
}