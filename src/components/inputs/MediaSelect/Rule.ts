import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import { IMeta } from "base/Model/IMeta";
import StringInput from "base/PropsInputs/StringInput";
import BooleanInput from "base/PropsInputs/BooleanInput";

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