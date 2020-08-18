import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

export interface IField{
  name:string;
  label:string;//存Label ID， 从资源文件读取
  //editor:any;
}

export interface IRule{
  editPaddingY?: string;
  editPaddingX?: string;
  empertyPadding?: string;
  
  labelKey?: string;
  dropInMargin: number;
  match: (meta:IMeta)=>boolean;
  accept: (child:INode)=>boolean;
  resolveLabel: (meta:IMeta)=>string|undefined;

  //fields: ;
}