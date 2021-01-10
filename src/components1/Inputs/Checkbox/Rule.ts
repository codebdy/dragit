import { IMeta } from "base1/Model/IMeta";
import { IProp } from "base1/Model/IProp";
import StringInput from "base1/PropsInputs/StringInput";
import colorRule from "base1/Rules/colorRule";
import { Rule } from "base1/Rules/Rule";
import sizeRule from "base1/Rules/sizeRule";

export class CheckboxRule extends Rule{
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
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      colorRule,
      sizeRule,
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      }
    ]
  }

}