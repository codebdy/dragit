import { IPropConfig } from "rx-drag/models/IPropConfig";
import { inputVariantConfig } from "./inputVariantConfig";

const inputConfig:Array<IPropConfig> =[
  inputVariantConfig,
  {
    name:'label',
    labelKey:'label',
    propType:'string',
  }, 
  {
    name:'fullWidth',
    labelKey:'full-width',
    propType:'boolean',
  },
  {
    name:'required',
    labelKey:'required',
    propType:'boolean',
  },
]

export default inputConfig;