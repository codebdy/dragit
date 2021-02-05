import { ID } from "../../rx-drag/models/baseTypes";

export interface IRxTemplate{
  id:ID;
  name:string;
  schema:any;
  thumbnail?:string;
}