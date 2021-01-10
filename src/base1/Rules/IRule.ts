import { IMeta } from "../Model/IMeta";
import { IProp } from "../Model/IProp";

export interface IRule{
  editPaddingY?: string;
  editPaddingX?: string;
  empertyPadding?: string;
  
  labelKey?: string;
  dropInMargin: number;

  accept: (child:IMeta)=>boolean;
  resolveLabel: (meta:IMeta)=>string|undefined;

  //属性字段
  getFields: (meta?:IMeta)=>Array<IProp>;

  //动作
  hasAction?:boolean;

  //数据
  hasField?:boolean;

  //验证
  hasValidation?:boolean;
}