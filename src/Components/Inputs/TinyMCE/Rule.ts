import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import { IMeta } from "Base/Model/IMeta";
import NumberInput from "Base/PropsInputs/NumberInput";

export class TinyMCERule extends Rule{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'height',
        label:'height',
        input: NumberInput,
      }
    ]
  }

}