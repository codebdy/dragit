import { ID } from "./graphqlTypes";

export interface INotification{
  id:ID,
  title?:string,
  content?:string,
  read:boolean,
  created_at:string,
}