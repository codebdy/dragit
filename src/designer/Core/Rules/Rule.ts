import { IRule } from "./IRule";
import { IMeta } from "../Node/IMeta";
import intl from 'react-intl-universal';
import { INode } from "../Node/INode";

export class Rule implements IRule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  empertyPadding = '16px';
  labelKey?: string;
  dropInMargin = 8;
  _label?:string;
  
  match(meta:IMeta){
    return true;
  }

  resolveLabel(meta:IMeta):string|undefined{
    let label = this.labelKey ? intl.get(this.labelKey) : this._label;
    return label ? label : meta.name;
  }

  set label(label:string){
    this._label = label;
  }

  accept(child:INode){
    return true;
  }
}