import { Node } from "./Node";
import { IState } from "../States/IState";
import { NormalState } from "../States/NormalState";

export class CanvasNode extends Node{

  activeState:IState = new NormalState(this);
  focusState:IState = new NormalState(this);

}