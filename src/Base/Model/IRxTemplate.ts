import { ID } from "../../rx-drag/models/baseTypes";
import { IRxMedia } from "./IRxMedia";

export interface IRxTemplate{
  id:ID;
  name:string;
  schema:string;
  media?:IRxMedia;
}