import { RelationCommand } from "./RelationCommand";

export class MoveBeforeCommand extends RelationCommand{
  excute(){
    if(this.targetNode){
      this.sourceNode.moveBefore(this.targetNode);      
    }

    return this.sourceNode;
  }
}