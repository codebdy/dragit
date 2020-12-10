import OptionSelect from "base/PropsInputs/OptionSelect";

const sizeRule = {
  name:'size',
  label:'size',
  input:OptionSelect,
  props:{
    items:[
      {
        value:'medium',
        label:'Medium'
      },
      {
        value:'small',
        label:'Small'
      },
    ]
  },
}

export default sizeRule;