import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { CardRule } from "./CardRule";
import { INode } from "../Node/INode";
import { FormFieldRule } from "./FormFieldRule";
import { PortletRule } from "./PortletRule";
import { IField } from "./IRule";
import NumberInput from "designer/Attrebutebox/Inputs/NumberInput";


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

    if(child.rule instanceof PortletRule){
      return true;
    }    
    return false;
  }
  
  getFields(): Array<IField>{
    return [
      {
        name:'alignContent',
        label:'Align Content',
        input:NumberInput,
        schema:{
          'stretch':'Stretch',
          'center':'Center',
          'flex-start':'Flex Start',
          'flex-end' : 'Flex End',
          'space-between':'Space Between',
          'space-around' : 'Space Around'
        }
      },
    ]
  }
  
}