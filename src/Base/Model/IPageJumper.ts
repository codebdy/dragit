import { ID } from "../../rx-drag/models/baseTypes";

export interface IPageJumper{
  pageId?:ID,
  dataId?:string,
  [key:string]:string|undefined,
}