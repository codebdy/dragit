import { IMeta } from "Base/RXNode/IMeta";
import { MetaConfig } from "../../../Base/RXNode/MetaConfig";

export class FormGridContainerRule extends MetaConfig{

  accept(child:IMeta){
    if(child.name === "FormGridItem"){
      return true
    }
    return false;
  }

}