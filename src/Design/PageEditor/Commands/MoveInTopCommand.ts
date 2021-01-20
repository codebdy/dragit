import { RelationCommand } from "./RelationCommand";

export class MoveInTopCommand extends RelationCommand{
  excute(){
    this.draggedNode.moveInTop(this.targetNode);
    return this.draggedNode;
  }
}