import { IRule } from "./IRule";
import { IProp } from "../Model/IProp";
import { IMeta } from "../Model/IMeta";
import intl from 'react-intl-universal';

export class Rule implements IRule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '16px';
  labelKey?: string;
  dropInMargin = 8;
  _label?:string;

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

  getFields(): Array<IProp>{
    return []
  }
}