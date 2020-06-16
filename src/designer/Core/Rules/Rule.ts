import { IRule } from "./IRule";
import { IMeta } from "../Node/IMeta";
import intl from 'react-intl-universal';

export class Rule implements IRule{
  labelKey: string = 'div';
  dropInMargin = 8;
  _label:string ="div";
  match(meta:IMeta){
    return true;
  }

  get label(){
    return this.labelKey ? intl.get(this.labelKey) : this._label;
  }

  set label(label){
    this._label = label;
  }

  accept(childRule:IRule){
    return true;
  }
}