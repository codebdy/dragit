import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "Base/RXNode/IPropConfig";
import colWidthRules from "Base/RXNode/Configs/colWidthRules";

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