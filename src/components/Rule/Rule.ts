import { IRule, IField } from "../IRule";
import { IMeta } from "../../designer/Core/Node/IMeta";
import intl from 'react-intl-universal';
import { INode } from "../../designer/Core/Node/INode";

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

  accept(child:INode){
    return true;
  }

  getFields(): Array<IField>{
    return []
  }
}