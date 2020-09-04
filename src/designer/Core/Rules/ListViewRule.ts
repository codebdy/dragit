import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

export class ListViewRule extends Rule{
  empertyPadding = '';
  
  match(meta:IMeta){
     return meta.name === 'ListView';
  }

  accept(child:INode){
    return false;
  }

}