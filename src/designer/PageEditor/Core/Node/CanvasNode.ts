import { Node } from "./Node";
import { IState } from "./States/IState";
import { NormalState } from "./States/NormalState";
import { INode } from "./INode";

export class CanvasNode extends Node{

  focusState:IState = new NormalState(this);
  constructor(children:Array<INode> = []){
    super({name:'Canvas'}, children);
  }
}

