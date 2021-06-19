import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class MediaViewConfig extends MetaConfig{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'width',
        labelKey:'width',
        propType:'number',
      }
    ]
  }

}