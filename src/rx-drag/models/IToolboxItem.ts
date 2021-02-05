import { IMeta } from "Base/RXNode/IMeta";

export interface IToolboxItem{
  title?:string,
  titleKey?:string,
  draggable?:boolean,
  meta?:IMeta,
}