import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { ICommand } from "./ICommand";

export abstract class RelationCommand implements ICommand{
  targetNode:RXNode<IMeta>;
  draggedNode:RXNode<IMeta>;
  oldParent?:RXNode<IMeta>;
  oldAfterBrather?:RXNode<IMeta>;
  
  constructor(targetNode:RXNode<IMeta>, draggedNode:RXNode<IMeta>){
    this.targetNode = targetNode;
    this.draggedNode = draggedNode;
    this.oldParent = draggedNode.parent;
    this.oldAfterBrather = draggedNode.afterBrother();
  }

  abstract excute():RXNode<IMeta>|undefined;

  undo(){
    if(this.oldAfterBrather){
      this.draggedNode.moveBefore(this.oldAfterBrather);
    }
    else if(this.oldParent){
      this.draggedNode.moveIn(this.oldParent);
    }
    else{
      this.draggedNode.remove();
    }
    return this.draggedNode;
  }
}