import { ID } from "Base/Model/graphqlTypes";
import { IPageJumper } from "Base/Model/IPageJumper";
import { IPageMutation } from "../Model/IPageMutation";

export interface PageAction{
  name:string;
  confirmMessage?:string;
  mutation?:IPageMutation;
  resetNodes?:string[];
  field?:string;
  id?:ID;
  //表格行命令使用
  value?:any;
  goback?:boolean;
  page?:IPageJumper;
}

export interface PageActionHandle{
  (formAction:PageAction): void;
}