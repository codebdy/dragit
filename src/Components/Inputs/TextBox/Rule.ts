import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import BooleanInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/BooleanInput";
import NumberInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/NumberInput";
import OptionSelect from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import inputRules from "Base/RXNode/Configs/inputRules";
import { MetaConfig } from "Base/RXNode/MetaConfig";

export class TextBoxRule extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...inputRules,
      {
        name:'type',
        label:'type',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'date',
              label:'date'
            },
            {
              value:'datetime-local',
              label:'datetime-local'
            },
            {
              value:'email',
              label:'email'
            },
            {
              value:'month',
              label:'month'
            },
            {
              value:'number',
              label:'number'
            },
            {
              value:'password',
              label:'password'
            },
            {
              value:'search',
              label:'search'
            },
            {
              value:'tel',
              label:'tel'
            },
            {
              value:'text',
              label:'text'
            },
            {
              value:'time',
              label:'time'
            },
            {
              value:'url',
              label:'url'
            },
            {
              value:'week',
              label:'week'
            },
            {
              value:'color',
              label:'color'
            },            
          ]
        },
      },
      {
        name:'shrinkLabel',
        label:'shrink-label',
        input:BooleanInput,
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
        name:'multiline',
        label:'multiline',
        input:BooleanInput,
      },
      {
        name:'rows',
        label:'rows',
        input:NumberInput,
        props:{
          min:1,
        }
      },
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      }
    ]
  }

}