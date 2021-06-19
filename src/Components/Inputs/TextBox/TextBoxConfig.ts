import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import inputConfig from "Components/common/configs/inputConfig";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import helperTextConfig from "Components/common/configs/helperTextConfig";
import {textboxSizeConfig} from "./textboxSizeConfig";

export class TextBoxConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...inputConfig,
      {
        name:'type',
        labelKey:'type',
        propType:'select',
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
        labelKey:'shrink-label',
        propType:'boolean',
      },
      textboxSizeConfig,
      {
        name:'multiline',
        labelKey:'multiline',
        propType:'boolean',
      },
      {
        name:'rows',
        labelKey:'rows',
        propType:'number',
        props:{
          min:1,
        }
      },
      helperTextConfig
    ]
  }

}