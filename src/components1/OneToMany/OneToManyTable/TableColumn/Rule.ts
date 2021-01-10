import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import { IMeta } from "base1/Model/IMeta";
import OptionSelect from "base1/PropsInputs/OptionSelect";
import StringInput from "base1/PropsInputs/StringInput";

export class TableColumnRule extends Rule{
 
  accept(child:IMeta){
    if(child.name === 'TableColumn'){
      return false;
    }
    return true;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      {
        name:'width',
        label:'width',
        input:StringInput,
      },
      {
        name:'align',
        label:'align',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'center',
              label:'Center'
            },
            {
              value:'inherit',
              label:'Inherit'
            },
            {
              value:'justify',
              label:'Justify'
            },
            {
              value:'left',
              label:'Left'
            },
            {
              value:'right',
              label:'Right'
            },
          ]
        },
      },
      {
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
      },
    ]
  }

}