import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";
import { IField } from "./IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import SwitchInput from "designer/Attrebutebox/Inputs/SwitchInput";
import TextareaInput from "designer/Attrebutebox/Inputs/TextareaInput";

export class ButtonRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  match(meta:IMeta){
    return meta.name === 'Button';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }

  getFields(): Array<IField>{
    return [
      {
        name:'color',
        label:'color',
        input:OptionSelect,
        schema:{
          'default' : 'default',
          'inherit': 'inherit',
          'primary' : 'primary',
          'secondary' : 'secondary',
        },
      },
      {
        name:'disabled',
        label:'disabled',
        input:SwitchInput,
      },
      {
        name:'disableElevation',
        label:'disableElevation',
        input:SwitchInput,
      },
      {
        name:'disableRipple',
        label:'disableRipple',
        input:SwitchInput,
      },
      {
        name:'endIcon',
        label:'endIcon',
        input:SwitchInput,
      },
      {
        name:'fullWidth',
        label:'fullWidth',
        input:SwitchInput,
      },
      {
        name:'size',
        label:'size',
        input:OptionSelect,
        schema:{
          'large' : 'large',
          'medium': 'medium',
          'small' : 'small',
        },
      },
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        schema:{
          'contained' : 'contained',
          'outlined': 'outlined',
          'text' : 'text',
        },
      },
      {
        name:'rxText',
        label:'text',
        input:TextareaInput,
      },
    ]
  }

}