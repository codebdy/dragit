import { Rule } from "./Rule";
import { IMeta } from "../../designer/Core/Node/IMeta";
import { INode } from "../../designer/Core/Node/INode";

export class PortletFormGridBodyRule extends Rule{

  match(meta:IMeta){
    return meta.name === 'PortletFormGridBody';
  }

  accept(child:INode){
    if(child.meta.name === "FormGridItem"){
      return true
    }
    return false;
  }

}