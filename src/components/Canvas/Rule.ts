import { Rule } from "../Rule/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { GridItemRule } from "../Rule/GridItemRule";

export class CanvasRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  dropInMargin = 0;

  accept(child:INode){
    if(child.rule instanceof GridItemRule){
      return false;
    }
    return true;
  }
}