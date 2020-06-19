import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";

export class DividerRule extends Rule{
  editPaddingY = '0';
  editPaddingX = '0';
  empertyPadding = '2px';

  match(meta:IMeta){
    return meta.name === 'Divider';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Divider';
  }
}