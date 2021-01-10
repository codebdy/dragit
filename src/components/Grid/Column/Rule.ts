import { Rule } from "../../../base/Rules/Rule";
import { IProp } from "../../../base/Model/IProp";
import colWidthRules from "base/Rules/colWidthRules";
import { IMeta } from "base/Model/IMeta";
import marginRules from "base/Rules/marginRules";


export class GridColumnRule extends Rule{
  editPaddingY = '8px';
  editPaddingX = '8px';
  labelKey ="column";

  accept(child:IMeta){
    if(child.name === 'GridColumn'){
      return false;
    }
    return true;
  }
  
  getFields(): Array<IProp>{
    return [
      ...marginRules,
      ...colWidthRules
    ]
  }
  
}
