import { IRxMetaConfig } from "../../rx-drag/models/IRxMetaConfig";
import { IPropConfig } from "../../rx-drag/models/IPropConfig";
import { IMeta } from "./IMeta";
import intl from 'react-intl-universal';

export class MetaConfig implements IRxMetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '16px';
  labelKey?: string;
  dropInMargin = 8;
  _label?:string;

  //动作
  hasAction?:boolean;
  hasMultiAction?:boolean;
  hasGraphQl?:boolean;

  //数据
  hasField?:boolean;
  //验证
  hasValidation?:boolean;

  resolveLabel(meta:IMeta):string|undefined{
    let label = this.labelKey ? intl.get(this.labelKey) : this._label;
    return label ? label : meta.name;
  }


  set label(label:string){
    this._label = label;
  }

  accept(child:IMeta){
    return true;
  }

  getPropConfigs(): Array<IPropConfig>{
    return []
  }
}