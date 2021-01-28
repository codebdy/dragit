import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";
import { ICommand } from "./ICommand";

export class ChangeMetaCommand implements ICommand{
  sourceNode: RxNode<IMeta>;
  newMeta?:IMeta;
  oldMeta?:IMeta;
  
  constructor(sourceNode:RxNode<IMeta>, newMeta:IMeta){
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