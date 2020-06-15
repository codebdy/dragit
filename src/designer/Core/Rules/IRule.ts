import { IMeta } from "../Node/IMeta";

export interface IRule{
  editPaddingY?: string;
  editPaddingX?: string;
  label: string;
  match: (meta:IMeta)=>boolean;
}