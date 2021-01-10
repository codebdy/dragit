import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import { IMeta } from "base1/Model/IMeta";
import NumberInput from "base1/PropsInputs/NumberInput";

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