import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";

export class FormFieldRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  match(meta:IMeta){
    return meta.name === 'FormField';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.props?.as;
  }
}