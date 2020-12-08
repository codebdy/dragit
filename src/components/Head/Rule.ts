import { Rule } from "base/Rules/Rule";
import { IMeta } from "base/Model/IMeta";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";

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