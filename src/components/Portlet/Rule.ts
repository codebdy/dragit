import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import SwitchInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";
import { IMeta } from "base/Model/IMeta";

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