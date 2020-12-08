import { IMeta } from "base/Model/IMeta";
import { Rule } from "../../base/Rules/Rule";

export class CanvasRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  dropInMargin = 0;

  accept(child:IMeta){
    if(child.name === 'GridColumn'){
      return false;
    }
    return true;
  }
}