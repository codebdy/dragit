import { IPropConfig } from "rx-drag/models/IPropConfig";

const marginConfigs:Array<IPropConfig> = [
  {
    name:'marginTop',
    labelKey:'margin-top',
    propType:'number',
    defaultValue:0,
  },

  {
    name:'marginRight',
    labelKey:'margin-right',
    propType:'number',
    defaultValue:0,
  },
  {
    name:'marginBottom',
    labelKey:'margin-bottom',
    propType:'number',
    defaultValue:0,
  },
  {
    name:'marginLeft',
    labelKey:'spacing-left',
    propType:'number',
    defaultValue:0,
  },

]

export default marginConfigs;