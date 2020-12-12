import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";
import { IMeta } from "base/Model/IMeta";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";

export class OneToOnePortletRule extends Rule{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === 'FormGridContainer'){
      return true;
    }
    return false;
  }

  getFields(): Array<IProp>{
    return [
      ...marginRules,
      ...elevationRules,   
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      },
    ]
  }

}