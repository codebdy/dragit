import { MetaConfig } from "../../../Base/RXNode/MetaConfig";
import { IMeta } from "../../../Base/RXNode/IMeta";
import { IPropConfig } from "../../../Base/RXNode/IPropConfig";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";

export class ButtonConfig extends MetaConfig{
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

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'color',
        label:'color',
        input:'select',
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
      {
        name:'size',
        label:'size',
        input:'select',
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
      {
        name:'variant',
        label:'variant',
        input:'select',
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
      {
        name:'disabled',
        label:'disabled',
        input:'boolean',
      },
      {
        name:'disableElevation',
        label:'disableElevation',
        input:'boolean',
      },
      {
        name:'disableRipple',
        label:'disableRipple',
        input:'boolean',
      },
      {
        name:'fullWidth',
        label:'fullWidth',
        input:'boolean',
      },
      {
        name:'rxText',
        label:'text',
        input:'string',
      },

    ]
  }

}