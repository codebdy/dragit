import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { GridItemRule } from "./GridItemRule";
import { INode } from "../Node/INode";

export class GridContainerRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="row";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.container === true){
      return true;
    }
    return false;
  }

  accept(child:INode){
    if(child.rule instanceof GridItemRule){
      return true;
    }
    return false;
  }

}