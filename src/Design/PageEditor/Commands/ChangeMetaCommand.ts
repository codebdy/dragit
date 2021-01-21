import { IMeta } from "Base/RXNode/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { ICommand } from "./ICommand";

export class ChangeMetaCommand implements ICommand{
  sourceNode: RXNode<IMeta>;
  newMeta?:IMeta;
  oldMeta?:IMeta;
  
  constructor(sourceNode:RXNode<IMeta>, newMeta:IMeta){
    this.sourceNode = sourceNode;
    this.newMeta = newMeta;
  }

  excute(){
    if(this.newMeta){
      this.oldMeta = this.sourceNode.meta;
      this.sourceNode.setMeta(this.newMeta);
    }
    
    return this.sourceNode;
  }

  undo(){
    if(this.oldMeta){
      this.newMeta = this.sourceNode.meta;
      this.sourceNode.setMeta(this.oldMeta);
    }
    return this.sourceNode;
  }
}