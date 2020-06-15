import { IView } from "./IView";
import { IState } from "./States/IState";
import { ActiveState } from "./States/ActiveState";
import { NormalState } from "./States/NormalState";
import { FocusState } from "./States/FocusState";
import { DraggedState } from "./States/DraggedState";
import { PreviewState } from "./States/PreviewState";
import { IMeta } from "./IMeta";
import { resolveRule } from "../Rules/resolveRule";
import { IRule } from "../Rules/IRule";
import bus, { WILL_FOCUS_NODE, REFRESH_IT, UN_DRAGE_NODE } from "../bus";
import { INode } from "./INode";
import { remove, contains, add } from "../Utils/ArrayHelper";

declare var window:any;

export class Node implements INode{
  static idSeed:number = 1;
  id: number = 0;
  rule: IRule;
  meta: IMeta;
  view?: IView;
  parent?: INode;
  children:Array<INode> = [];

  normalState:IState = new NormalState(this);
  activeState:IState = new ActiveState(this);
  focusState:IState = new FocusState(this);
  draggedState:IState = new DraggedState(this);
  previewState:IState = new PreviewState(this);
  //[key: string]:any;

  state:IState;
  constructor(meta:IMeta, children:Array<INode>=[]){
    this.seedId();
    //this.view = view;
    this.meta = meta;
    //this.parent = parent;
    this.state = this.normalState;
    this.rule =  resolveRule(meta.name);
    this.children = children;
    this.children.map((child:INode) =>{
      child.parent = this;
      return child;
    })
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  seedId(){
    this.id = Node.idSeed
    Node.idSeed ++
  }

  get props(){
    return {
      className:'drag-node-outline ' + this.state.className,
      style:{
        paddingTop : this.rule.editPaddingY,
        paddingBottom : this.rule.editPaddingY,
        paddingLeft : this.rule.editPaddingX,
        paddingRight : this.rule.editPaddingX,
        ...this.state.style
      },
      onMouseMove : this.handleMouseMove,
      onMouseOut : this.handleMouseOut,
      onClick : this.handleClick,
    };
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
    if((this as any)[stateName] !== this.state){
      this.state.leave();
      this.state = (this as any)[stateName];
      this.state.enter();
      this.view?.refresh();
    }
  }

  //refresh(){
  //  this.view?.setSchema(this.schema);
 // }

  removeFormParent(){
    //console.log('removeFormParent', this.id)
    this.parent && remove(this, this.parent?.children);
    this.parent = undefined;
  }

  moveInBottom(target:INode){
    let parent = this.parent;
    if(contains(this, target.children)){
      return;
    }
    //console.log('moveInBottom target', target.id)
    this.removeFormParent();
    
    add(this, target.children);
    this.parent = target;
    //bus.emit(REFRESH_IT, this.schema.parent?.id );
    //bus.emit(REFRESH_IT, target.schema.id );
    //bus.emit(UN_DRAGE_NODE, window.draggedNode);
    
    parent?.view?.refresh();
    target.view?.refresh();
  }

  //moveInTop(target:IContext){
//
  //};
}