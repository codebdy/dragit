import { IProp } from "base1/Model/IProp";
import OptionSelect from "base1/PropsInputs/OptionSelect";

const colorRule:IProp =   {
  name:'color',
  label:'color',
  input:OptionSelect,
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

export default colorRule;