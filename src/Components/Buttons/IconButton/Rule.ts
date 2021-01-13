import { Rule } from "../../../Base/Rules/Rule";
import { IMeta } from "../../../Base/Model/IMeta";
import { IProp } from "../../../Base/Model/IProp";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import marginRules from "Base/Rules/marginRules";
import BooleanInput from "Base/PropsInputs/BooleanInput";

export class IconButtonRule extends Rule{
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
              value:'medium',
              label:'Medium'
            },
            {
              value:'small',
              label:'Small'
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
    ]
  }

}