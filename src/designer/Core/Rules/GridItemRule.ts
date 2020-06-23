import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { CardRule } from "./CardRule";
import { INode } from "../Node/INode";
import { FormFieldRule } from "./FormFieldRule";

export class GridItemRule extends Rule{
  //editPaddingY = '16px';
  //editPaddingX = '16px';
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
    if(child.rule instanceof FormFieldRule){
      return true;
    }    
    return false;
  }  
}