import { Node } from "./Node";
import { IState } from "./States/IState";
import { NormalState } from "./States/NormalState";
import { CanvasActiveState } from "./States/CanvasActiveState";

export class CanvasNode extends Node{

  activeState:IState = new CanvasActiveState(this);
  focusState:IState = new NormalState(this);

}