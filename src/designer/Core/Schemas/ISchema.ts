export interface ISchema{
  id:number,
  name:string,
  children?:Array<ISchema>,
}