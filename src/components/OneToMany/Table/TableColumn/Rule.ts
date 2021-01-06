import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import { IMeta } from "base/Model/IMeta";

export class TableColumnRule extends Rule{
 
  accept(child:IMeta){
    if(child.name === 'TableColumn'){
      return false;
    }
    return true;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}