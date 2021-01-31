import OptionSelect from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/OptionSelect";

const sizeConfig = {
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

export default sizeConfig;