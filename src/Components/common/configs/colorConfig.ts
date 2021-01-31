import { IPropConfig } from "rx-drag/models/IPropConfig";

const colorConfig:IPropConfig =   {
  name:'color',
  labelKey:'color',
  propType:'select',
  props:{
    items:[
      {
        value:'default',
        label:'Default'
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
}

export default colorConfig;