import { Rule } from "Base/Rules/Rule";
import { IMeta } from "Base/Model/IMeta";
import { IProp } from "Base/Model/IProp";
import colWidthRules from "Base/Rules/colWidthRules";

export class PortletGridItemRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';

  accept(child:IMeta){
    return true;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Grid Item';
  }

  getFields(): Array<IProp>{
    return [
      ...colWidthRules
    ]
  }

}