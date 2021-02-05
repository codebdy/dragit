import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";
import { ICommand } from "./ICommand";

export class ClearCommand implements ICommand{
  canvasNode: RxNode<IMeta>;
  nodes?: Array<RxNode<IMeta>>;
  selectedNode?: RxNode<IMeta>;

  constructor(canvasNode:RxNode<IMeta>, selectedNode?:RxNode<IMeta>){
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