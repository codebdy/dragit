import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import { IMeta } from "Base/Model/IMeta";

export class ListViewPaginationRule extends Rule{
  empertyPadding = '';
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}