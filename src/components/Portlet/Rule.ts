import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import NumberInput from "base/PropsInputs/NumberInput";
import { IProp } from "../../base/IProp";
import SwitchInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";

export class PortletRule extends Rule{

  accept(child:INode){
    if(child.meta.name === "PortletFormGridBody"){
      return true
    }
    if(child.meta.name === "PortletFooter"){
      return true
    }
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'collapsible',
        label:'collapsible',
        input:SwitchInput,
      },      
      {
        name:'open',
        label:'defalut-open',
        input:SwitchInput,
      },      
      {
        name:'marginTop',
        label:'margin-top',
        input:NumberInput,
        props:{
          max:100,
          min:0,
          step:1
        }
      },

      {
        name:'marginRight',
        label:'margin-right',
        input:NumberInput,
        props:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'marginBottom',
        label:'margin-bottom',
        input:NumberInput,
        props:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'marginLeft',
        label:'spacing-left',
        input:NumberInput,
        props:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'elevation',
        label:'elevation',
        input:NumberInput,
        props:{
          max:24,
          min:0,
          step:1
        }
      },
      {
        name:'withHeader',
        label:'with-header',
        input:SwitchInput,
      }, 
      {
        name:'title',
        label:'title',
        input:StringInput,
      },
    ]
  }

}