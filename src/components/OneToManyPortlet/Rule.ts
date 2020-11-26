import { Rule } from "base/Rules/Rule";
import { INode } from "designer/PageEditor/Core/Node/INode";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";

export class OneToManyPortletRule extends Rule{
  empertyPadding = '';
  hasField = true;
  
  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      },
    ]
  }

}