import { MetaConfig } from "../../Base/RXNode/MetaConfig";
import { IMeta } from "../../Base/RXNode/IMeta";

export class DividerRule extends MetaConfig{
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