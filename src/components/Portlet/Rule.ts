import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IProp } from "../../base/IProp";
import SwitchInput from "base/PropsInputs/BooleanInput";
import StringInput from "base/PropsInputs/StringInput";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";

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
        name:'withHeader',
        label:'title',
        xs:12,
        input:SwitchInput,
      }, 
      {
        name:'title',
        label:'title',
        xs:12,
        input:StringInput,
      },
      ...marginRules,
      ...elevationRules,      
    ]
  }

}