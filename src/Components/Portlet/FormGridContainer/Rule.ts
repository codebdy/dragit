import { IMeta } from "Base/Model/IMeta";
import { Rule } from "../../../Base/Rules/Rule";

export class FormGridContainerRule extends Rule{

  accept(child:IMeta){
    if(child.name === "FormGridItem"){
      return true
    }
    return false;
  }

}