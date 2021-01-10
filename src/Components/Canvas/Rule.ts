import { IMeta } from "Base/Model/IMeta";
import { Rule } from "../../Base/Rules/Rule";

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