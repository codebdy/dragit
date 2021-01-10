import { IProp } from "Base/Model/IProp";
import BooleanInput from "Base/PropsInputs/BooleanInput";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import StringInput from "Base/PropsInputs/StringInput";

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