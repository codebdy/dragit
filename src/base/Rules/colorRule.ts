import { IProp } from "base/Model/IProp";
import OptionSelect from "base/PropsInputs/OptionSelect";

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