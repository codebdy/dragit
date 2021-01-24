import { ID } from "./graphqlTypes";

export type MaxWidth = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false';

export interface IQuery{
  name:string;
  variables:{
    [key:string]:any;
  }
}

export interface IRxPage{
  //使用GUID当ID用
  id:ID,
  name?:string, 
  maxWidth?: MaxWidth;
  width?:number;
  layout?:Array<any>,
  auths?:string[],
  query?:string, 
}