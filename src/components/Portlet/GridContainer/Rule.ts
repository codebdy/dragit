import { IMeta } from "base/Model/IMeta";
import { Rule } from "../../../base/Rules/Rule";

export class FormGridContainerRule extends Rule{

  accept(child:IMeta){
    if(child.name === "FormGridItem"){
      return true
    }
    return false;
  }

}