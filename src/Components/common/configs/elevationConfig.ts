import { IPropConfig } from "rx-drag/models/IPropConfig";

const elevationConfig:Array<IPropConfig> = [
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