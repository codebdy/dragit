import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import elevationConfig from "Components/common/configs/elevationConfig";
import marginConfigs from "Components/common/configs/marginConfigs";
import { IMeta } from "Base/RXNode/IMeta";

export class PortletConfig extends MetaConfig{

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
      ...elevationConfig,      
      {
        name:'collapsible',
        labelKey:'collapsible',
        propType:'boolean',
      },      
      {
        name:'open',
        labelKey:'defalut-open',
        propType:'boolean',
      },      
      {
        name:'withHeader',
        labelKey:'with-header',
        propType:'boolean',
      }, 
      {
        name:'title',
        labelKey:'title',
        propType:'string',
      },
    ]
  }

}