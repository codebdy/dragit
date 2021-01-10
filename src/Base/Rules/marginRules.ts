import { IProp } from "Base/Model/IProp";
import NumberInput from "Base/PropsInputs/NumberInput";

const marginRules:Array<IProp> = [
  {
    name:'marginTop',
    label:'margin-top',
    input:NumberInput,
    props:{
      defaultValue:0,          
    }

  },

  {
    name:'marginRight',
    label:'margin-right',
    input:NumberInput,
    props:{
      defaultValue:0,          
    }
  },
  {
    name:'marginBottom',
    label:'margin-bottom',
    input:NumberInput,
    props:{
      defaultValue:0,          
    }
  },
  {
    name:'marginLeft',
    label:'spacing-left',
    input:NumberInput,
    props:{
      defaultValue:0,          
    }
  },

]

export default marginRules;