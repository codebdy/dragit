import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import { IMeta } from "base/Model/IMeta";

export class TreeSelectRule extends Rule{
  empertyPadding = '';

  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      //...marginRules,
      //...elevationRules,
    ]
  }

}