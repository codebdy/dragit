import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import colWidthConfig from "Components/common/configs/colWidthConfig";

export class FormGridItemConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';

  accept(child:IMeta){
    if(child.name === 'TableColumn' 
      || child.name.startsWith('ListView')
    ){
      return false;
    }
    return true;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Grid Item';
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...colWidthConfig
    ]
  }

}