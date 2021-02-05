import { IPropConfig } from "rx-drag/models/IPropConfig";

export const textboxSizeConfig:IPropConfig= {
  name:'size',
  labelKey:'size',
  propType:'select',
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
} 