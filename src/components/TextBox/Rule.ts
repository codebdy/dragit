import { IProp } from "base/IProp";
import BooleanInput from "base/PropsInputs/BooleanInput";
import NumberInput from "base/PropsInputs/NumberInput";
import OptionSelect from "base/PropsInputs/OptionSelect";
import StringInput from "base/PropsInputs/StringInput";
import inputRules from "base/Rules/inputRules";
import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";

export class TextBoxRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  accept(child:INode){
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
        name:'multiline',
        label:'multiline',
        input:BooleanInput,
      },
      {
        name:'rows',
        label:'rows',
        input:NumberInput,
        props:{
          min:1,
        }
      },
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      }
    ]
  }

}