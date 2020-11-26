import { Rule } from "base/Rules/Rule";
import { INode } from "designer/PageEditor/Core/Node/INode";
import { IMeta } from "base/Model/IMeta";
import { IProp } from "base/Model/IProp";
import colWidthRules from "base/Rules/colWidthRules";

export class PortletGridItemRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';

  accept(child:INode){
    return false;
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