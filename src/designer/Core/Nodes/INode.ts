export interface INode{
  id:number,
  name:string,
  children?:Array<INode>,
}