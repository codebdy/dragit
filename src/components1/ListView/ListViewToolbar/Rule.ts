import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import { IMeta } from "base1/Model/IMeta";

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