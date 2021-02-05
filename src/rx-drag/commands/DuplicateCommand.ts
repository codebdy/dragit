import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";
import { ICommand } from "./ICommand";

export class DuplicateCommand implements ICommand{
  sourceNode: RxNode<IMeta>;
  newNode?: RxNode<IMeta>;

  constructor(sourceNode:RxNode<IMeta>){
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