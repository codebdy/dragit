import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

export class MediasPortletRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  match(meta:IMeta){
    return meta.name === 'MediasPortlet';
  }

  accept(child:INode){
    return false;
  }

}