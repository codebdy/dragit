import { RelationCommand } from "./RelationCommand";

export class RemoveCommand extends RelationCommand{
  excute(){
    this.sourceNode.remove();
    return undefined;
  }
}