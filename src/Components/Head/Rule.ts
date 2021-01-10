import { Rule } from "Base/Rules/Rule";
import { IMeta } from "Base/Model/IMeta";
import { IProp } from "Base/Model/IProp";
import StringInput from "Base/PropsInputs/StringInput";

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