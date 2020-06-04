export interface INode{
  id:string,
  name:string,
  children?:Array<INode>,
}