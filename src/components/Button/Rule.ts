import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IMeta } from "../../base/IMeta";
import { IProp } from "../../base/IProp";
import OptionSelect from "base/PropsInputs/OptionSelect";
import SwitchInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";

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

  getFields(): Array<IProp>{
    return [
      ...marginRules,
      ...elevationRules,
      {
        name:'color',
        label:'color',
        input:OptionSelect,
        props:{
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
        props:{
          'Large' : 'large',
          'Medium': 'medium',
          'Small' : 'small',
        },
      },
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        props:{
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
        props:{
          'Submit' : 'submit',
          'Reset': 'reset',
          'Button' : 'button',
        },
      },
    ]
  }

}