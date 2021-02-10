import { ID } from "../../rx-drag/models/baseTypes";

export interface IRxMedia{
  id:ID,
  title: string,
  thumbnail:string,
  src?:string,
  alt?:string,
}