import { IPropConfig } from "./IPropConfig";
import { IRxMeta } from "./IRxMeta";

export interface IRxMetaConfig{
  editPaddingY?: string;
  editPaddingX?: string;
  empertyPadding?: string;
  
  labelKey?: string;
  label?:string;
  dropInMargin: number;

  accept: (child:IRxMeta)=>boolean;
  resolveLabel: (meta:IRxMeta)=>string|undefined;

  //属性字段
  getPropConfigs: ()=>Array<IPropConfig>;

}