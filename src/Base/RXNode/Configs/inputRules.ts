import { IPropConfig } from "rx-drag/models/IPropConfig";
import BooleanInput from "Design/PageEditor/AttrebuteBox/PropsInputs/BooleanInput";
import OptionSelect from "Design/PageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";

const inputRules:Array<IPropConfig> =[
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