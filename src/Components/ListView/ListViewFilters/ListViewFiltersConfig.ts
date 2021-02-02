import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class ListViewFiltersConfig extends MetaConfig{
  
  accept(child:IMeta){
    if(child.name === 'ListViewKeywordFilter' || child.name === 'ListViewEnumFilter' || child.name === 'ListViewRangeFilter'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
    ]
  }

}