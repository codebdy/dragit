import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class ListViewToolbarConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';
  
  accept(child:IMeta){
    if(child.name === 'ListViewFilters'
    ||child.name === 'ListViewBatchActions'){
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