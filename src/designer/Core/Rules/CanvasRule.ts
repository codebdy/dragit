import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { GridItemRule } from "./GridItemRule";
import { IMeta } from "../Node/IMeta";

export class CanvasRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  dropInMargin = 0;

  match(meta:IMeta){
    return meta.name === 'Canvas';
  }
  
  accept(child:INode){
    if(child.rule.label === (new GridItemRule()).label){
      return false;
    }
    return true;
  }
}