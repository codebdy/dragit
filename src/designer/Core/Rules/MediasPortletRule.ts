import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";
import NumberInput from "designer/Attrebutebox/Inputs/NumberInput";
import { IField } from "./IRule";
import StyledTextInput from "designer/Attrebutebox/Inputs/StyledTextInput";

export class MediasPortletRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  match(meta:IMeta){
    return meta.name === 'MediasPortlet';
  }

  accept(child:INode){
    return false;
  }
  getFields(): Array<IField>{
    return [
      {
        name:'cols',
        label:'cols',
        input:StyledTextInput,
        schema:{
          max:6,
          min:1,
          step:1        
        }
      },
      {
        name:'spacingTop',
        label:'spacing-top',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },

      {
        name:'spacingRight',
        label:'spacing-right',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'spacingBottom',
        label:'spacing-bottom',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'spacingLeft',
        label:'spacing-left',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'elevation',
        label:'elevation',
        input:NumberInput,
        schema:{
          max:24,
          min:0,
          step:1
        }
      },

    ]
  }

}