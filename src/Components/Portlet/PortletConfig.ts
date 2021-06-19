import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import elevationConfig from "Components/common/configs/elevationConfig";
import marginConfigs from "Components/common/configs/marginConfigs";
import { IMeta } from "Base/RXNode/IMeta";
import squareConfig from "Components/common/configs/squareConfig";

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

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,
      squareConfig,   
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
        props:{
          xs:12,
        }
      },
    ]
  }

}