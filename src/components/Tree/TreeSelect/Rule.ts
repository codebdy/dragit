import { Rule } from "base/Rules/Rule";
import { INode } from "designer/PageEditor/Core/Node/INode";
import { IProp } from "base/Model/IProp";
import SwitchInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";

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