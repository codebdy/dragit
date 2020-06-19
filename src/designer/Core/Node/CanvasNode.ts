import { Node } from "./Node";
import { IState } from "./States/IState";
import { NormalState } from "./States/NormalState";

export class CanvasNode extends Node{

  focusState:IState = new NormalState(this);
  constructor(){
    super({name:'Canvas'}, [])
  }
}

