import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { GridItemRule } from "./GridItemRule";
import { INode } from "../Node/INode";

export class GridContainerRule extends Rule{
  labelKey ="row";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.container === true){
      return true;
    }
    return false;
  }

  accept(child:INode){
    if(child.rule.label === (new GridItemRule()).label){
      return true;
    }
    return false;
  }

}