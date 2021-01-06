import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";
import OptionSelect from "base/PropsInputs/OptionSelect";
import { IMeta } from "base/Model/IMeta";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";
import OneToManyTableColumnsDialog from "./PropsInputs/OneToManyTableColumnsDialog";

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
        name:'columns',
        label:'columns',
        input:OneToManyTableColumnsDialog,
      },
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