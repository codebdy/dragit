import { IView } from "./IView";
import { IContext } from "./IContext";
import { IState } from "../States/IState";
import { ActiveState } from "../States/ActiveState";
import { NormalState } from "../States/NormalState";
import { FocusState } from "../States/FocusState";
import { DraggedState } from "../States/DraggedState";
import { PreviewState } from "../States/PreviewState";

export class NodeContext implements IContext{
  view:IView | undefined;

  normalState:IState = new NormalState(this);
  activeState:IState = new ActiveState(this);
  focustState:IState = new FocusState(this);
  draggedState:IState = new DraggedState(this);
  previewState:IState = new PreviewState(this);
  [key: string]:any;

  state:IState;
  constructor(view :IView){
    this.view = view;
    this.state = this.normalState;
    //this.toNormalState();
  }

  handleMouseMove(event:MouseEvent){
    this.state.handleMouseMove(event)
  }

  handleMouseOut(event:MouseEvent){
    this.state.handleMouseOut(event)
  }

  toNormalState(){
    this.toState('normalState')
  }
  toActiveState(){
    this.toState('activeState')
  }
  toFocusState(){
    this.toState('focusState')
  }
  toDraggedState(){
    this.toState('draggedState')
  }
  toPreivewState(){
    this.toState('previewState')
  }

  toState(stateName : string){
    if(this[stateName] !== this.state){
      this.state = this[stateName]
      this.view?.setStyle(this.state.style())
    }
  }

}