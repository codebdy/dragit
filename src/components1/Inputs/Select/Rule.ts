import { IMeta } from "base1/Model/IMeta";
import { IProp } from "base1/Model/IProp";
import OptionSelect from "base1/PropsInputs/OptionSelect";
import StringInput from "base1/PropsInputs/StringInput";
import apiRule from "base1/Rules/apiRule";
import inputRules from "base1/Rules/inputRules";
import itemsRule from "base1/Rules/itemsRule";
import { Rule } from "base1/Rules/Rule";

export class SelectRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      ...inputRules,
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
      /*{
        name:'multiple',
        label:'multiple-select',
        xs:6,
        input:BooleanInput,
      },*/
      {
        name:'itemKey',
        label:'item-key',
        input:StringInput,
      },
      {
        name:'itemName',
        label:'item-name',
        input:StringInput,
      },

      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      },
      itemsRule,
      apiRule,
    ]
  }


}