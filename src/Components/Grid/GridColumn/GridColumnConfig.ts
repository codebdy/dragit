import { MetaConfig } from "../../../Base/RXNode/MetaConfig";
import { IPropConfig } from "../../../rx-drag/models/IPropConfig";
import colWidthConfig from "Components/common/configs/colWidthConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";


export class GridColumnConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';
  labelKey ="column";

  accept(child:IMeta){
    if(child.name === 'GridColumn' 
      || (child.name.startsWith('ListView') && child.name !== 'ListView')
    ){
      return false;
    }
    return true;
  }
  
  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...colWidthConfig
    ]
  }
  
}
