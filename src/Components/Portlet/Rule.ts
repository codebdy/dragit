import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import SwitchInput from "Design/PageEditor/AttrebuteBox/PropsInputs/BooleanInput";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";
import elevationRules from "Base/RXNode/Configs/elevationRules";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";
import { IMeta } from "Base/RXNode/IMeta";

export class PortletRule extends MetaConfig{

  accept(child:IMeta){
    if(child.name === "PortletFormGridBody"){
      return true
    }
    if(child.name === "PortletFooter"){
      return true
    }
    return true;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
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
        input:StringInput,
      },
    ]
  }

}