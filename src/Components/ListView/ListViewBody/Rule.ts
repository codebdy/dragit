import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import { IMeta } from "Base/Model/IMeta";

export class ListViewBodyRule extends Rule{
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}