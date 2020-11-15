import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";

export class CanvasRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  dropInMargin = 0;

  accept(child:INode){
    if(child.meta.name === 'GridColumn'){
      return false;
    }
    return true;
  }
}