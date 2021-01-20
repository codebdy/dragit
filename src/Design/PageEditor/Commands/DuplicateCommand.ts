import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { ICommand } from "./ICommand";

export class DuplicateCommand implements ICommand{
  targetNode: RXNode<IMeta>;
  newNode?: RXNode<IMeta>;

  constructor(targetNode:RXNode<IMeta>, draggedNode:RXNode<IMeta>){
    this.targetNode = targetNode;
  }

  excute(){
    this.newNode = this.targetNode.duplicate();
    return this.newNode;
  }

  undo(){
    this.newNode?.remove();
    return this.targetNode;
  }
}