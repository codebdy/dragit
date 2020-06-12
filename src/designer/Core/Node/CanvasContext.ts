import { NodeContext } from "./NodeContext";
import { IState } from "./States/IState";
import { NormalState } from "./States/NormalState";

export class CanvasContext extends NodeContext{

  activeState:IState = new NormalState(this);
  focusState:IState = new NormalState(this);

}