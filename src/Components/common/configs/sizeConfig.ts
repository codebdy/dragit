import { IPropConfig } from "rx-drag/models/IPropConfig";

const sizeConfig:IPropConfig = {
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

export default sizeConfig;