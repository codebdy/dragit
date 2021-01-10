import { Rule } from "../../../Base/Rules/Rule";
import { IProp } from "../../../Base/Model/IProp";
import colWidthRules from "Base/Rules/colWidthRules";
import { IMeta } from "Base/Model/IMeta";
import marginRules from "Base/Rules/marginRules";


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
