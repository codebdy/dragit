import { RelationCommand } from "./RelationCommand";

export class MoveInCommand extends RelationCommand{
  excute(){
    this.draggedNode.moveIn(this.targetNode);
    return this.draggedNode;
  }
}