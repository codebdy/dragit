import { Rule } from "../../Rules/Rule";
import { INode } from "../../../designer/Core/Node/INode";

export class PortletGridContainerRule extends Rule{

  accept(child:INode){
    if(child.meta.name === "FormGridItem"){
      return true
    }
    return false;
  }

}