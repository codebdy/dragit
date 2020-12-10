import { Rule } from "base/Rules/Rule";
import { IMeta } from "base/Model/IMeta";
import { IProp } from "base/Model/IProp";
import colWidthRules from "base/Rules/colWidthRules";

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