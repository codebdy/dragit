import { IMeta } from "Base/Model/IMeta";

export interface IToolboxItem{
  title?:string,
  titleKey?:string,
  draggable?:boolean,
  meta?:IMeta,
}