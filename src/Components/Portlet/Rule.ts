import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import SwitchInput from "Base/PropsInputs/BooleanInput";
import StringInput from "Base/PropsInputs/StringInput";
import elevationRules from "Base/Rules/elevationRules";
import marginRules from "Base/Rules/marginRules";
import { IMeta } from "Base/Model/IMeta";

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