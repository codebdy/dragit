import { IMeta } from "./IMeta";

export type IToolboxItem = IMeta&{
  dragable:boolean,
  hidden:boolean,
}