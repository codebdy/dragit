import { Rule } from "base1/Rules/Rule";
import { IMeta } from "base1/Model/IMeta";
import { IProp } from "base1/Model/IProp";
import StringInput from "base1/PropsInputs/StringInput";

export class HeadRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  
  accept(child:IMeta){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }

  getFields(): Array<IProp>{
    return [
       {
        name:'rxText',
        label:'text',
        xs:12,        
        input:StringInput,
        props:{
          //multiline:true,
          //rows:2,
        }
      },
    ]
  }

}