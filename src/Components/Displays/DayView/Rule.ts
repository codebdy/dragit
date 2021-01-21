import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "Base/RXNode/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class DayViewRule extends MetaConfig{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
    ]
  }

}