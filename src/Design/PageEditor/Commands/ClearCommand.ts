import { IMeta } from "Base/RXNode/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { ICommand } from "./ICommand";

export class ClearCommand implements ICommand{
  canvasNode: RXNode<IMeta>;
  nodes?: Array<RXNode<IMeta>>;
  selectedNode?: RXNode<IMeta>;

  constructor(canvasNode:RXNode<IMeta>, selectedNode?:RXNode<IMeta>){
    this.canvasNode = canvasNode;
    this.selectedNode = selectedNode;
  }

  excute(){
    this.nodes = this.canvasNode.children;
    this.canvasNode.setChildren([]);
    return undefined;
  }

  undo(){
    this.canvasNode.setChildren(this.nodes);
    return this.selectedNode;
  }
}