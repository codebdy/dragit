import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import StringInput from "Base/PropsInputs/StringInput";
import { IMeta } from "Base/Model/IMeta";
import elevationRules from "Base/Rules/elevationRules";
import marginRules from "Base/Rules/marginRules";

export class OneToManyPortletRule extends Rule{
  empertyPadding = '';
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
        name:'title',
        label:'title',
        xs:12,
        input:StringInput,      
      },
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      },
    ]
  }

}