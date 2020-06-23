import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";

export class FormGridItemRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  match(meta:IMeta){
    return meta.name === 'FormGridItem';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Grid item:' + meta.props?.as;
  }
}