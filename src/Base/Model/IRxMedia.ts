import { ID } from "../../rx-drag/models/baseTypes";

export interface IRxMedia{
  id:ID,
  name: string,
  thumbnail:string,
  fileName:string,
  alt?:string,
}