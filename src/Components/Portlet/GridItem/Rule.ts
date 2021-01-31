import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import colWidthRules from "Components/utils/configs/colWidthRules";

export class PortletGridItemRule extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';

  accept(child:IMeta){
    return true;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Grid Item';
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...colWidthRules
    ]
  }

}