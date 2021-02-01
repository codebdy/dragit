import { IMeta } from "Base/RXNode/IMeta";
import { MetaConfig } from "Base/RXNode/MetaConfig";

export class LoopPanelConfig extends MetaConfig{
  hasField = true;
  
  accept(child:IMeta){
    return true;
  }

}