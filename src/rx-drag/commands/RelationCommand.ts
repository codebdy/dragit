import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";
import { ICommand } from "./ICommand";

export abstract class RelationCommand implements ICommand{
  targetNode?:RxNode<IMeta>;
  sourceNode:RxNode<IMeta>;
  oldParent?:RxNode<IMeta>;
  oldNextSibling?:RxNode<IMeta>;
  oldPreviousSibling?:RxNode<IMeta>;
  
  constructor(sourceNode:RxNode<IMeta>, targetNode?:RxNode<IMeta>){
    this.targetNode = targetNode;
    this.sourceNode = sourceNode;
    this.oldParent = sourceNode.parent;
    this.oldNextSibling = sourceNode.nextSibling();
    this.oldPreviousSibling = sourceNode.previousSibling();
  }

  abstract excute():RxNode<IMeta>|undefined;

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