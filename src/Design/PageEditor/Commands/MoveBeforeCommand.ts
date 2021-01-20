import { RelationCommand } from "./RelationCommand";

export class MoveBeforeCommand extends RelationCommand{
  excute(){
    this.draggedNode.moveBefore(this.targetNode);
    return this.draggedNode;
  }
}