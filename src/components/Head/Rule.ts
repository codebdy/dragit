import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IMeta } from "../../designer/Core/Node/IMeta";
import { IProp } from "../../base/IProp";
import StringInput from "base/PropsInputs/StringInput";

export class HeadRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  
  accept(child:INode){
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