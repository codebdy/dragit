import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";

export class CardHaderRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  match(meta:IMeta){
    return meta.name === 'CardHeader';
  }

  accept(child:INode){
    return false;
  }

}