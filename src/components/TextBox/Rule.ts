import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";

export class TextBoxRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';

  accept(child:INode){
    return false;
  }
}