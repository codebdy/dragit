import { ID } from "./graphqlTypes";

export interface ITreeNode{
  id?:ID,
  [key:string]:any,
  children?:Array<ITreeNode>,
}