import { ID } from "../../rx-drag/models/baseTypes";

export interface INotification{
  id:ID,
  title?:string,
  content?:string,
  read:boolean,
  created_at:string,
}