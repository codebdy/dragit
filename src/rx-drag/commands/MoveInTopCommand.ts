import { RelationCommand } from "./RelationCommand";

export class MoveInTopCommand extends RelationCommand{
  excute(){
    if(this.targetNode){
      this.sourceNode.moveInTop(this.targetNode);
    }
    return this.sourceNode;
  }
}