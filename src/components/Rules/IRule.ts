import { IMeta } from "../../designer/Core/Node/IMeta";
import { INode } from "../../designer/Core/Node/INode";

export interface IField{
  name:string;
  label:string;//存Label ID， 从资源文件读取
  input:any;
  schema?:any;
  xs?:boolean | 12 | 2 | 1 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined;
}

export interface IRule{
  editPaddingY?: string;
  editPaddingX?: string;
  empertyPadding?: string;
  
  labelKey?: string;
  dropInMargin: number;

  accept: (child:INode)=>boolean;
  resolveLabel: (meta:IMeta)=>string|undefined;

  //属性字段
  getFields: (meta?:IMeta)=>Array<IField>;

  //动作
  hasAction?:boolean;

  //数据
  hasData?:boolean;
}