import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IMeta } from "../../designer/Core/Node/IMeta";
import { IField } from "../../base/Rules/IRule";
import StringInput from "base/PropsInputs/StringInput";

export class HeadRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';

/*  match(meta:IMeta){
    let tagName = meta.name.toLowerCase();
    return tagName === 'h1' || 
      tagName === 'h2' || 
      tagName === 'h3' || 
      tagName === 'h4' ||
      tagName === 'h5' ||
      tagName === 'h6';
  }*/
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }

  getFields(): Array<IField>{
    return [
       {
        name:'rxText',
        label:'text',
        input:StringInput,
      },
    ]
  }

}