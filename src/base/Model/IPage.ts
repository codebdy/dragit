import { ID } from "./graphqlTypes";

export type MaxWidth = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false';

export interface IQuery{
  name:string;
  variables:{
    [key:string]:any;
  }
}

export interface IPageSchema{
  layout?:Array<any>,
  auths?:string[],
  isFormPage?:boolean,
  refreshAppInfo?:boolean,
  query?:IQuery, 
}

export interface IPage{
  id:ID,
  slug:string,
  name?:string, 
  maxWidth?: MaxWidth;
  inTabIndex?:boolean;
  width?:number;
  schema?:IPageSchema,  
}