import { Rule } from "base/Rules/Rule";
import { INode } from "designer/PageEditor/Core/Node/INode";
import { IProp } from "base/Model/IProp";

export class TreeSelectRule extends Rule{

  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      //...marginRules,
      //...elevationRules,
    ]
  }

}