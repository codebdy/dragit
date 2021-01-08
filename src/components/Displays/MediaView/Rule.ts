import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import { IMeta } from "base/Model/IMeta";

export class EnumViewRule extends Rule{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}