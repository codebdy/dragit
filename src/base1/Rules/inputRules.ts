import { IProp } from "base1/Model/IProp";
import BooleanInput from "base1/PropsInputs/BooleanInput";
import OptionSelect from "base1/PropsInputs/OptionSelect";
import StringInput from "base1/PropsInputs/StringInput";

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
    name:'fullWidth',
    label:'full-width',
    input:BooleanInput,
  },
  {
    name:'required',
    label:'required',
    input:BooleanInput,
  },
]

export default inputRules;