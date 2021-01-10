import { ID } from "./graphqlTypes";

export interface IPageJumper{
  pageId?:ID,
  dataId?:string,
  [key:string]:string|undefined,
}