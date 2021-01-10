import { Rule } from "../../../base1/Rules/Rule";
import { IProp } from "../../../base1/Model/IProp";
import colWidthRules from "base1/Rules/colWidthRules";
import { IMeta } from "base1/Model/IMeta";
import marginRules from "base1/Rules/marginRules";


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
