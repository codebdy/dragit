import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { IRule } from "./IRule";
import { GridItemRule } from "./GridItemRule";

export class GridContainerRule extends Rule{
  labelKey ="grid-container";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.container === true){
      return true;
    }
    return false;
  }

  accept(childRule:IRule){
    if(childRule.label === (new GridItemRule()).label){
      return true;
    }
    return false;
  }

}