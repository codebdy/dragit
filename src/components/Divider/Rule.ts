import { Rule } from "../../base/Rules/Rule";
import { IMeta } from "../../base/Model/IMeta";

export class DividerRule extends Rule{
  editPaddingY = '0';
  editPaddingX = '0';
  empertyPadding = '2px';

  accept(child:IMeta){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Divider';
  }
}