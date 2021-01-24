import { ID } from "./graphqlTypes";

export interface IRXTemplate{
  id:ID;
  name:string;
  schema:any;
  thumbnail?:string;
}