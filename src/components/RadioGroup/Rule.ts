import { IMeta } from "base/Model/IMeta";
import { IProp } from "base/Model/IProp";
import BooleanInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";
import colorRule from "base/Rules/colorRule";
import { Rule } from "base/Rules/Rule";
import sizeRule from "base/Rules/sizeRule";

export class RadioGroupRule extends Rule{
  //editPaddingY = '';
  //editPaddingX = '';
  //empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      colorRule,
      sizeRule,
      {
        name:'row',
        label:'row-show',
        input:BooleanInput,
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