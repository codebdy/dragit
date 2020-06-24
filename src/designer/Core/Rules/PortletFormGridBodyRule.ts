import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

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