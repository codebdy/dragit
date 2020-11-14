import { Rule } from "./Rule";
import { INode } from "../../designer/Core/Node/INode";
import { GridItemRule } from "./GridItemRule";
import { IMeta } from "../../designer/Core/Node/IMeta";

export class CanvasRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  dropInMargin = 0;

  match(meta:IMeta){
    return meta.name === 'Canvas';
  }
  
  accept(child:INode){
    if(child.rule instanceof GridItemRule){
      return false;
    }
    return true;
  }
}