import { MetaConfig } from "../../../Base/RXNode/MetaConfig";
import { IPropConfig } from "../../../Base/RXNode/IPropConfig";
import colWidthRules from "Base/RXNode/Configs/colWidthRules";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";


export class GridColumnRule extends MetaConfig{
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
