import { IPropConfig } from "rx-drag/models/IPropConfig";

const elevationConfig:Array<IPropConfig> = [
  {
    name:'variant',
    labelKey:'variant',
    propType:'select',
    props:{
      items:[
        {
          value:'elevation',
          label:'Elevation',
        },
        {
          value:'outlined',
          label:'Outlined',
        },
      ]
    }
  },
  {
    name:'elevation',
    labelKey:'elevation',
    propType:'number',
    props:{
      defaultValue:0,
      min:0,
      max:24,
    }
  },
]

export default elevationConfig;