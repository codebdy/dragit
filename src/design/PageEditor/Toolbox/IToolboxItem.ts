import { IMeta } from "base/Model/IMeta";

export interface IToolboxItem{
  title?:string,
  titleKey?:string,
  draggable?:boolean,
  meta?:IMeta,
}