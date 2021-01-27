import { RelationCommand } from "./RelationCommand";

export class MoveInCommand extends RelationCommand{
  excute(){
    if(this.targetNode){
      this.sourceNode.moveIn(this.targetNode);
    }
    return this.sourceNode;
  }
}