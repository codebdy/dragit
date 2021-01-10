import { IMeta } from "Base/Model/IMeta";
import { IProp } from "Base/Model/IProp";
import BooleanInput from "Base/PropsInputs/BooleanInput";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import StringInput from "Base/PropsInputs/StringInput";
import apiRule from "Base/Rules/apiRule";
import inputRules from "Base/Rules/inputRules";
import itemsRule from "Base/Rules/itemsRule";
import { Rule } from "Base/Rules/Rule";

export class TreeSelectRule extends Rule{
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
      {
        name:'multiple',
        label:'multiple-select',
        xs:6,
        input:BooleanInput,
      },
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