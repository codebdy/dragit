import { Rule } from "../../../Base/Rules/Rule";
import { IMeta } from "../../../Base/Model/IMeta";
import { IProp } from "../../../Base/Model/IProp";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import StringInput from "Base/PropsInputs/StringInput";
import marginRules from "Base/Rules/marginRules";
import BooleanInput from "Base/PropsInputs/BooleanInput";

export class ButtonRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasAction = true;

  accept(child:IMeta){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }

  getFields(): Array<IProp>{
    return [
      ...marginRules,
      {
        name:'color',
        label:'color',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'default',
              label:'Default'
            },
            {
              value:'inherit',
              label:'Inherit'
            },
            {
              value:'primary',
              label:'Primary'
            },
            {
              value:'secondary',
              label:'Secondary'
            },
          ]
        },
      },
      {
        name:'size',
        label:'size',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'large',
              label:'Large'
            },
            {
              value:'medium',
              label:'Medium'
            },
            {
              value:'primary',
              label:'Primary'
            },
            {
              value:'small',
              label:'Small'
            },
          ]
        },
      },
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'contained',
              label:'Contained'
            },
            {
              value:'outlined',
              label:'Outlined'
            },
            {
              value:'text',
              label:'Text'
            },
          ]
        },
      },
      {
        name:'disabled',
        label:'disabled',
        input:BooleanInput,
      },
      {
        name:'disableElevation',
        label:'disableElevation',
        input:BooleanInput,
      },
      {
        name:'disableRipple',
        label:'disableRipple',
        input:BooleanInput,
      },
      {
        name:'fullWidth',
        label:'fullWidth',
        input:BooleanInput,
      },
      {
        name:'rxText',
        label:'text',
        xs:12,
        input:StringInput,
      },

    ]
  }

}