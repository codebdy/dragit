import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";
import elevationConfig from "Components/common/configs/elevationConfig";

export class ListViewConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';

  accept(child:IMeta){
    if(child.name === 'ListViewBody'){
      return true;
    }
    if(child.name === 'ListViewToolbar'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig
    ]
  }

}