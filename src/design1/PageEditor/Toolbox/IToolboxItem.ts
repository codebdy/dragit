import { IMeta } from "base1/Model/IMeta";

export interface IToolboxItem{
  title?:string,
  titleKey?:string,
  draggable?:boolean,
  meta?:IMeta,
}