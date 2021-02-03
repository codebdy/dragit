import { IPropConfig } from "rx-drag/models/IPropConfig";

export const inputVariantConfig:IPropConfig = {
  name:'variant',
  labelKey:'variant',
  propType:'select',
  props:{
    items:[
      {
        value:'filled',
        label:'Filled'
      },
      {
        value:'outlined',
        label:'Outlined'
      },
      {
        value:'standard',
        label:'Standard'
      },
    ]
  },
}