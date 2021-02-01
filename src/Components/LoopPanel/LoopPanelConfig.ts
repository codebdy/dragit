import { IMeta } from "Base/RXNode/IMeta";
import { MetaConfig } from "Base/RXNode/MetaConfig";

export class LoopPanelConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';
  hasField = true;
  
  accept(child:IMeta){
    return true;
  }

}