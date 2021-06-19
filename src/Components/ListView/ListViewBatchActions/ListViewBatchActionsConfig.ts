import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class ListViewBatchActionsConfig extends MetaConfig{
  
  accept(child:IMeta){
    if(child.name === 'Button'||child.name === 'IconButton'){
      return true;
    }
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
    ]
  }

  getDataConfig(): Array<IPropConfig>{
    return [];
  }
}