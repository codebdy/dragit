import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import SwitchInput from "base1/PropsInputs/BooleanInput";
import StringInput from "base1/PropsInputs/StringInput";
import elevationRules from "base1/Rules/elevationRules";
import marginRules from "base1/Rules/marginRules";
import { IMeta } from "base1/Model/IMeta";

export class PortletRule extends Rule{

  accept(child:IMeta){
    if(child.name === "PortletFormGridBody"){
      return true
    }
    if(child.name === "PortletFooter"){
      return true
    }
    return true;
  }

  getFields(): Array<IProp>{
    return [
      ...marginRules,
      ...elevationRules,      
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
        name:'withHeader',
        label:'with-header',
        input:SwitchInput,
      }, 
      {
        name:'title',
        label:'title',
        xs:12,
        input:StringInput,
      },
    ]
  }

}