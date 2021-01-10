import { IProp } from "Base/Model/IProp";
import OptionSelect from "Base/PropsInputs/OptionSelect";

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