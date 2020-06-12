import { IView } from "./IView";
import { INode } from "./INode";
import { IState } from "../States/IState";
import { ActiveState } from "../States/ActiveState";
import { NormalState } from "../States/NormalState";
import { FocusState } from "../States/FocusState";
import { DraggedState } from "../States/DraggedState";
import { PreviewState } from "../States/PreviewState";
import { ISchema } from "./ISchema";
import { resolveRule } from "../Rules/resolveRule";
import { IRule } from "../Rules/IRule";
import { ActionFunctionAny, Action } from "redux-actions";
import bus, { WILL_FOCUS_NODE } from "../bus";

export class Node implements INode{
  static idSeed:number = 1;
  id: number = 0 ;
  view:IView ;
  schema:ISchema;
  rule:IRule;
  parent?:INode;

  normalState:IState = new NormalState(this);
  activeState:IState = new ActiveState(this);
  focusState:IState = new FocusState(this);
  draggedState:IState = new DraggedState(this);
  previewState:IState = new PreviewState(this);
  [key: string]:any;

  state:IState;
  constructor(view :IView, schema:ISchema, parent?:INode){
    this.seedId();
    this.view = view;
    this.schema = schema;
    this.parent = parent;
    this.state = this.normalState;
    this.rule =  resolveRule(schema.name);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);

   }

   seedId(){
    this.id = Node.idSeed
    Node.idSeed ++
  }

  dispatch( action: ActionFunctionAny<Action<any>>){

  }
  
  handleMouseMove(event:MouseEvent){
    this.state.handleMouseMove(event);
  }

  handleMouseOut(event:MouseEvent){
    this.state.handleMouseOut(event);
  }

  handleClick(event:MouseEvent){
    this.state.handleClick(event);
  }

  toNormalState(){
    this.toState('normalState');
  }
  toActiveState(){
    this.toState('activeState');
  }
  toFocusState(){
    bus.emit(WILL_FOCUS_NODE, this);
    this.toState('focusState');
  }
  toDraggedState(){
    this.toState('draggedState');
  }
  toPreivewState(){
    this.toState('previewState');
  }

  toState(stateName : string){
    if(this[stateName] !== this.state){
      this.state.leave();
      this.state = this[stateName];
      this.state.enter();
      this.view?.setStyle(this.state.style);
      this.view?.setClassName(this.state.className);
    }
  }
}