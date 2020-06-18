import { IRule } from "./IRule";
import { IMeta } from "../Node/IMeta";
import intl from 'react-intl-universal';
import { INode } from "../Node/INode";

export class Rule implements IRule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey?: string;
  dropInMargin = 8;
  _label?:string;
  
  match(meta:IMeta){
    return true;
  }

  get label(){
    return this.labelKey ? intl.get(this.labelKey) : this._label;
  }

  set label(label){
    this._label = label;
  }

  accept(child:INode){
    return true;
  }
}