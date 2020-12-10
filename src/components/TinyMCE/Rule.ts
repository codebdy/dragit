import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import { IMeta } from "base/Model/IMeta";
import NumberInput from "base/PropsInputs/NumberInput";

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