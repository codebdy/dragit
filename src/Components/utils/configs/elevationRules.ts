import { IPropConfig } from "rx-drag/models/IPropConfig";
import NumberInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/NumberInput";

const elevationRules:Array<IPropConfig> = [
  {
    name:'elevation',
    label:'elevation',
    input:NumberInput,
    props:{
      defaultValue:0,
      min:0,
      max:24,
    }
  },
]

export default elevationRules;