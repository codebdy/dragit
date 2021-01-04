import {drawerData} from "./drawerData";
import { sleep } from "../utils/sleep";

var drawerItems = drawerData;
export const drawerResolver = async ()=>{
  await sleep(1000);
  return {id:'1', items:drawerItems}
}

export const saveDrawerItemsResolver = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(1000);
  drawerItems = args.items;
  return {id:'1', items:drawerItems}
}