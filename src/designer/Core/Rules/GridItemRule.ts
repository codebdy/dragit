import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { CardRule } from "./CardRule";
import { INode } from "../Node/INode";

export class GridItemRule extends Rule{
  labelKey ="column";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.item === true){
      return true;
    }
    return false;
  }

  accept(child:INode){
    if(child.rule.label === (new CardRule()).label){
      return true;
    }    
    return false;
  }  
}