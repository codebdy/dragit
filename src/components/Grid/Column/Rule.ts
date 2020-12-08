import { Rule } from "../../../base/Rules/Rule";
import { IProp } from "../../../base/Model/IProp";
import colWidthRules from "base/Rules/colWidthRules";
import { IMeta } from "base/Model/IMeta";


export class GridColumnRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="column";

  accept(child:IMeta){
    if(child.name === 'GridColumn'){
      return false;
    }
    return true;
  }
  
  getFields(): Array<IProp>{
    return [
      ...colWidthRules
    ]
  }
  
}
