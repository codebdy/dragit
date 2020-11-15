import { IProp } from "base/IProp";
import NumberInput from "base/PropsInputs/NumberInput";

const elevationRules:Array<IProp> = [
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