import { sleep } from "mock/utils/sleep";
import { remove } from "rx-drag/utils/ArrayHelper";
import appsData from "./data";

export function getRxApp(id:string){
  for(var i = 0; i < appsData.length; i++){
    if(appsData[i].id === id){
      return appsData[i];
    }
  }
}

export const rxApp = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock rxApp', args);
  return getRxApp(args.id)
}

export const rxApps = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return appsData;
}

export const removeRxApp = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('removeRxApp', args)
  const rxApp = getRxApp(args.id);
  remove(rxApp, appsData);
  return rxApp
}

export const saveRxApp = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  const oldRxApp = getRxApp(args.rxApp?.id)
  console.log('Server received RxApp data:', args, oldRxApp);
  let rxApp = {...oldRxApp, ...args.rxApp};
  return rxApp;
}

export const createRxApp = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('Server received Create RxApp data:', args);
  appsData.push(args.rxApp);
  //let rxApp = {...oldRxApp, ...args.rxApp};
  return args.rxApp;
}

export const appQueryResolvers = {
  rxApp,
  rxApps,
}

export const appMutationResolvers = {
  removeRxApp,
  saveRxApp,
  createRxApp
}