import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import StringInput from "Base/PropsInputs/StringInput";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import { IMeta } from "Base/Model/IMeta";
import elevationRules from "Base/Rules/elevationRules";
import marginRules from "Base/Rules/marginRules";

export class OneToManyTableRule extends Rule{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === 'TableColumn'){
      return true;
    }
    return false;
  }

  getFields(): Array<IProp>{
    return [
      ...marginRules,
      ...elevationRules,   
      {
        name:'size',
        label:'size',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'medium',
              label:'Medium'
            },
            {
              value:'small',
              label:'Small'
            },
          ]
        },
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