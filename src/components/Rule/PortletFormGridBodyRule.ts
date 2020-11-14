import { Rule } from "./Rule";
import { INode } from "../../designer/Core/Node/INode";

export class PortletFormGridBodyRule extends Rule{

  accept(child:INode){
    if(child.meta.name === "FormGridItem"){
      return true
    }
    return false;
  }

}