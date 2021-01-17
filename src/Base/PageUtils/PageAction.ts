import { ID } from "Base/Model/graphqlTypes";
import { IPageMutation } from "../Model/IPageMutation";

export interface PageAction{
  name:string;
  confirmMessage?:string;
  mutation?:IPageMutation;
  resetNodes?:string[];
  field?:string;
  id?:ID;
  value?:any;
  [key:string]: any;
}

export interface PageActionHandle{
  (formAction:PageAction): void;
}