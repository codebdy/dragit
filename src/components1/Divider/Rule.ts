import { Rule } from "../../base1/Rules/Rule";
import { IMeta } from "../../base1/Model/IMeta";

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