import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import { IMeta } from "Base/Model/IMeta";

export class ListViewToolbarRule extends Rule{
  editPaddingY = '8px';
  editPaddingX = '8px';
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}