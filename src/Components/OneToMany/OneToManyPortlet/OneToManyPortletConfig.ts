import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import elevationConfig from "Components/common/configs/elevationConfig";
import marginConfigs from "Components/common/configs/marginConfigs";
import helperTextConfig from "Components/common/configs/helperTextConfig";

export class OneToManyPortletConfig extends MetaConfig{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === 'FormGridContainer'){
      return true;
    }
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,   
      {
        name:'title',
        labelKey:'title',
        propType:'string',      
      },
      helperTextConfig,
    ]
  }

}