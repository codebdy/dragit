import { IMeta } from "base1/Model/IMeta";
import { Rule } from "../../base1/Rules/Rule";

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