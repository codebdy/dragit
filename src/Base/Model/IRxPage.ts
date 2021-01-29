import { IMeta } from "Base/RXNode/IMeta";
import { ID } from "../../rx-drag/models/baseTypes";

export type MaxWidth = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false';

export interface IQuery{
  name:string;
  variables:{
    [key:string]:any;
  }
}

export interface IRxPage{
  //使用UUID当ID用
  id:ID,
  name?:string, 
  max_width?: MaxWidth;
  width?:number;
  schema?:Array<IMeta>,
  auths?:string[],
  query?:string, 
}