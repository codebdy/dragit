import { Rule } from "../Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";

export class SelectRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  accept(child:INode){
    return false;
  }
}