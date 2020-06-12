export interface ISchema{
  id:number;
  name:string,
  parent?: ISchema;
  children?:Array<ISchema>,
}