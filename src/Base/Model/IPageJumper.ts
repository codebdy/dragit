import { ID } from "../../rx-drag/models/baseTypes";

export interface IPageJumper{
  openStyle?:'JUMP'|'POPUP'|'DRAWER'|'',
  pageId?:ID,
  dataId?:string,
  [key:string]:string|undefined,
}