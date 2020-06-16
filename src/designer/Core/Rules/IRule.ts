import { IMeta } from "../Node/IMeta";

export interface IRule{
  editPaddingY?: string;
  editPaddingX?: string;
  label: string;
  dropInMargin: number;
  match: (meta:IMeta)=>boolean;
  accept: (childRule:IRule)=>boolean;
}