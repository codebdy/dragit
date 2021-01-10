import { ID } from "./graphqlTypes";

export interface IMedia{
  id:ID,
  title: string,
  thumbnail:string,
  src?:string,
  alt?:string,
}