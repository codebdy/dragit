export interface ITreeNode{
  id?:string,
  [key:string]:any,
  children?:Array<ITreeNode>,
}