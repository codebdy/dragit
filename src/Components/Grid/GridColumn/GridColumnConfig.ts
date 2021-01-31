import { MetaConfig } from "../../../Base/RXNode/MetaConfig";
import { IPropConfig } from "../../../rx-drag/models/IPropConfig";
import colWidthRules from "Components/common/configs/colWidthRules";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";


export class GridColumnConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';
  labelKey ="column";

  accept(child:IMeta){
    if(child.name === 'GridColumn'){
      return false;
    }
    return true;
  }
  
  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...colWidthRules
    ]
  }
  
}
