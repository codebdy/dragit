import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

export class CardRule extends Rule{

  match(meta:IMeta){
    return meta.name === 'Card';
  }

  accept(child:INode){
    if(child.meta.name === "CardHeader"){
      return true
    }
    if(child.meta.name === "CardContent"){
      return true
    }
    if(child.meta.name === "CardActions"){
      return true
    }
    return false;
  }

}