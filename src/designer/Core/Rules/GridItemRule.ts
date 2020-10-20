import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";
import { IField } from "./IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";

export class GridItemRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="column";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.item === true){
      return true;
    }
    return false;
  }

  accept(child:INode){
    if(child.rule instanceof GridItemRule){
      return false;
    }
   /*
    if(child.rule instanceof GridContainerRule){
      return true;
    }
    if(child.rule instanceof CardRule){
      return true;
    }    
    if(child.rule instanceof FormFieldRule){
      return true;
    }

    if(child.rule instanceof PortletRule){
      return true;
    }    */
    return true;
  }
  
  getFields(): Array<IField>{
    return [
      {
        name:'xl',
        label:'xl',
        input:OptionSelect,
        schema:{
          'false':false,
          'auto':'auto',
          'true':true,
          '1' : 1,
          '2': 2,
          '3' : 3,
          '4' : 4,
          '5' : 5,
          '6' : 6,
          '7' : 7,
          '8' : 8,
          '9' : 9,
          '10' : 10,
          '11' : 11,
          '12' : 12,
        },
      },
      {
        name:'lg',
        label:'lg',
        input:OptionSelect,
        schema:{
          'false':false,
          'auto':'auto',
          'true':true,
          '1' : 1,
          '2': 2,
          '3' : 3,
          '4' : 4,
          '5' : 5,
          '6' : 6,
          '7' : 7,
          '8' : 8,
          '9' : 9,
          '10' : 10,
          '11' : 11,
          '12' : 12,
        },
      },
      {
        name:'md',
        label:'md',
        input:OptionSelect,
        schema:{
          'false':false,
          'auto':'auto',
          'true':true,
          '1' : 1,
          '2': 2,
          '3' : 3,
          '4' : 4,
          '5' : 5,
          '6' : 6,
          '7' : 7,
          '8' : 8,
          '9' : 9,
          '10' : 10,
          '11' : 11,
          '12' : 12,
        },
      },
      {
        name:'sm',
        label:'sm',
        input:OptionSelect,
        schema:{
          'false':false,
          'auto':'auto',
          'true':true,
          '1' : 1,
          '2': 2,
          '3' : 3,
          '4' : 4,
          '5' : 5,
          '6' : 6,
          '7' : 7,
          '8' : 8,
          '9' : 9,
          '10' : 10,
          '11' : 11,
          '12' : 12,
        },
      },

      {
        name:'xs',
        label:'xs',
        input:OptionSelect,
        schema:{
          'false':false,
          'auto':'auto',
          'true':true,
          '1' : 1,
          '2': 2,
          '3' : 3,
          '4' : 4,
          '5' : 5,
          '6' : 6,
          '7' : 7,
          '8' : 8,
          '9' : 9,
          '10' : 10,
          '11' : 11,
          '12' : 12,
        },
      },

    ]
  }
  
}