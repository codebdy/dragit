import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import { IMeta } from "base/Model/IMeta";

export class ListViewToolbarRule extends Rule{
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}