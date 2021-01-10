import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import { IMeta } from "base1/Model/IMeta";
import StringInput from "base1/PropsInputs/StringInput";
import BooleanInput from "base1/PropsInputs/BooleanInput";

export class MediaSelectRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  
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
      {
        name:'width',
        label:'width',
        input:StringInput,
      },
      {
        name:'avatar',
        label:'avatar',
        input:BooleanInput,
      },
    ]
  }

}