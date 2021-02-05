import { RelationCommand } from "./RelationCommand";

export class MoveAfterCommand extends RelationCommand{
  excute(){
    if(this.targetNode){
      this.sourceNode.moveAfter(this.targetNode);      
    }
    return this.sourceNode;
  }
}