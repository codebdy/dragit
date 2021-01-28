import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import OptionSelect from "Design/PageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";

export class TableColumnRule extends MetaConfig{
 
  accept(child:IMeta){
    if(child.name === 'TableColumn'){
      return false;
    }
    return true;
  }

  getPropConfigs(): Array<IPropConfig>{
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