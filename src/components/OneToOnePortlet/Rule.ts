import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";
import { IMeta } from "base/Model/IMeta";

export class OneToOnePortletRule extends Rule{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
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