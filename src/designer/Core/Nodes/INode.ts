import { ISchema } from "../Schemas/ISchema";

export interface INode{
  id:number;
  schema:ISchema;
  children?: Array<INode>;
}