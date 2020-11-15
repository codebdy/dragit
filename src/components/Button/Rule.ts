import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IMeta } from "../../designer/Core/Node/IMeta";
import { IField } from "../../base/Rules/IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import SwitchInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";

export class ButtonRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasAction = true;

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
          'Default' : 'default',
          'Inherit': 'inherit',
          'Primary' : 'primary',
          'Secondary' : 'secondary',
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
          'Large' : 'large',
          'Medium': 'medium',
          'Small' : 'small',
        },
      },
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        schema:{
          'Contained' : 'contained',
          'Outlined': 'outlined',
          'Text' : 'text',
        },
      },
      {
        name:'rxText',
        label:'text',
        input:StringInput,
      },
      {
        name:'type',
        label:'type',
        input:OptionSelect,
        schema:{
          'Submit' : 'submit',
          'Reset': 'reset',
          'Button' : 'button',
        },
      },
    ]
  }

}