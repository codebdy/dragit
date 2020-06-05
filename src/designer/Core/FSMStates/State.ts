import { IState } from "./IState";
import { INode } from "../Nodes/INode";

export class State implements IState{
  node:INode;

  constructor(node:INode){
    this.node = node
  }
}