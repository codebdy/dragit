import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";

export class ButtonRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  match(meta:IMeta){
    return meta.name === 'Button';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }
}