import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

export interface IRule{
  editPaddingY?: string;
  editPaddingX?: string;
  empertyPadding?: string;
  
  labelKey?: string;
  dropInMargin: number;
  match: (meta:IMeta)=>boolean;
  accept: (child:INode)=>boolean;
  resolveLabel: (meta:IMeta)=>string|undefined;
}