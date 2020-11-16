import { Rule } from "../../../base/Rules/Rule";
import { INode } from "../../../designer/PageEditor/Core/Node/INode";
import { IProp } from "../../../base/IProp";
import colWidthRules from "base/Rules/colWidthRules";


export class GridColumnRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="column";

  accept(child:INode){
    if(child.meta.name === 'GridColumn'){
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
