import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import { IMeta } from "Base/Model/IMeta";
import StringInput from "Base/PropsInputs/StringInput";
import BooleanInput from "Base/PropsInputs/BooleanInput";

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