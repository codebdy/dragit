import { IMeta } from "Base/RXNode/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { ICommand } from "./ICommand";

export class DuplicateCommand implements ICommand{
  sourceNode: RXNode<IMeta>;
  newNode?: RXNode<IMeta>;

  constructor(sourceNode:RXNode<IMeta>){
    this.sourceNode = sourceNode;
  }

  excute(){
    this.newNode = this.sourceNode.duplicate();
    return this.newNode;
  }

  undo(){
    this.newNode?.remove();
    return this.sourceNode;
  }
}