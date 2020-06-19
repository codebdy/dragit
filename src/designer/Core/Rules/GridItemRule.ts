import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { CardRule } from "./CardRule";
import { INode } from "../Node/INode";
import { FieldRule } from "./FieldRule";

export class GridItemRule extends Rule{
  labelKey ="column";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.item === true){
      return true;
    }
    return false;
  }

  accept(child:INode){
    if(child.rule instanceof CardRule){
      return true;
    }    
    if(child.rule instanceof FieldRule){
      return true;
    }    
    return false;
  }  
}