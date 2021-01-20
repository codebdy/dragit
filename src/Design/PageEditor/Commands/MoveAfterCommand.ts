import { RelationCommand } from "./RelationCommand";

export class MoveAfterCommand extends RelationCommand{
  excute(){
    this.draggedNode.moveAfter(this.targetNode);
    return this.draggedNode;
  }
}