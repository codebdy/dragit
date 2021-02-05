import { ID } from "../../rx-drag/models/baseTypes";

export interface ITreeNode{
  id?:ID,
  [key:string]:any,
  children?:Array<ITreeNode>,
}