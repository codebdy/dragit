import { Rule } from "base/Rules/Rule";
import { INode } from "designer/PageEditor/Core/Node/INode";
import { IProp } from "base/Model/IProp";

export class FieldViewRule extends Rule{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
    ]
  }

}