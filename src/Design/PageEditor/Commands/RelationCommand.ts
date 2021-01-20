import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { ICommand } from "./ICommand";

export abstract class RelationCommand implements ICommand{
  targetNode?:RXNode<IMeta>;
  sourceNode:RXNode<IMeta>;
  oldParent?:RXNode<IMeta>;
  oldNextSibling?:RXNode<IMeta>;
  oldPreviousSibling?:RXNode<IMeta>;
  
  constructor(sourceNode:RXNode<IMeta>, targetNode?:RXNode<IMeta>){
    this.targetNode = targetNode;
    this.sourceNode = sourceNode;
    this.oldParent = sourceNode.parent;
    this.oldNextSibling = sourceNode.nextSibling();
    this.oldPreviousSibling = sourceNode.previousSibling();
  }

  abstract excute():RXNode<IMeta>|undefined;

  undo(){
    if(this.oldNextSibling){
      this.sourceNode.moveBefore(this.oldNextSibling);
    }
    else if(this.oldPreviousSibling){
      this.sourceNode.moveAfter(this.oldPreviousSibling);
    }
    else if(this.oldParent){
      this.sourceNode.moveInTop(this.oldParent);
    }
    else{
      this.sourceNode.remove();
    }

    return this.sourceNode.parent ? this.sourceNode : undefined;
  }
}