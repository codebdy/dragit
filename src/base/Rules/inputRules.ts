import { IProp } from "base/Model/IProp";
import BooleanInput from "base/PropsInputs/BooleanInput";
import OptionSelect from "base/PropsInputs/OptionSelect";
import StringInput from "base/PropsInputs/StringInput";

const inputRules:Array<IProp> =[
  {
    name:'variant',
    label:'variant',
    input:OptionSelect,
    props:{
      items:[
        {
          value:'filled',
          label:'Filled'
        },
        {
          value:'outlined',
          label:'Outlined'
        },
        {
          value:'standard',
          label:'Standard'
        },
      ]
    },
  },
  {
    name:'label',
    label:'label',
    input:StringInput,
  }, 
  {
    name:'required',
    label:'required',
    input:BooleanInput,
  },
]

export default inputRules;