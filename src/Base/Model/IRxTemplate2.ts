import { ID } from "./graphqlTypes";

export interface IRxTemplate{
  id:ID;
  name:string;
  schema:any;
  thumbnail?:string;
}