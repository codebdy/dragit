import { Rule } from "base1/Rules/Rule";
import { IMeta } from "base1/Model/IMeta";
import { IProp } from "base1/Model/IProp";
import colWidthRules from "base1/Rules/colWidthRules";

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