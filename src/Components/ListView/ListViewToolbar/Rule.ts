import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "Base/RXNode/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class ListViewToolbarRule extends MetaConfig{
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