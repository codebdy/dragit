import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/PageEditor/Core/Node/INode";
import { IMeta } from "../../base/Model/IMeta";

export class DividerRule extends Rule{
  editPaddingY = '0';
  editPaddingX = '0';
  empertyPadding = '2px';

  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Divider';
  }
}