import { IMeta } from "./IMeta";
import { IPropConfig } from "./IPropConfig";

export interface IMetaConfig{
  editPaddingY?: string;
  editPaddingX?: string;
  empertyPadding?: string;
  
  labelKey?: string;
  label?:string;
  dropInMargin: number;

  accept: (child:IMeta)=>boolean;
  resolveLabel: (meta:IMeta)=>string|undefined;

  //属性字段
  getPropConfigs: ()=>Array<IPropConfig>;

  //动作
  hasAction?:boolean;

  //数据
  hasField?:boolean;

  //验证
  hasValidation?:boolean;
}