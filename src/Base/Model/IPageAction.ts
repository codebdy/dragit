import { ID } from "rx-drag/models/baseTypes";
import { IPageJumper } from "Base/Model/IPageJumper";
import { IPageMutation } from "./IPageMutation";

export interface IPageAction{
  name:string;
  confirmMessage?:string;
  mutation?:IPageMutation;
  resetNodes?:string[];
  field?:string;
  id?:ID;
  //表格行命令使用
  value?:any;
  pageJumper?:IPageJumper;
}

export interface PageActionHandle{
  (formAction:IPageAction): void;
}