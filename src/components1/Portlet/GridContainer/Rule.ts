import { IMeta } from "base1/Model/IMeta";
import { Rule } from "../../../base1/Rules/Rule";

export class FormGridContainerRule extends Rule{

  accept(child:IMeta){
    if(child.name === "FormGridItem"){
      return true
    }
    return false;
  }

}