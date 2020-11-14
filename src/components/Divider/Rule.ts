import { Rule } from "../Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IMeta } from "../../designer/Core/Node/IMeta";

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