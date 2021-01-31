import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class ListViewToolbarConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';
  
  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
    ]
  }

}