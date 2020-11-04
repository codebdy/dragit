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
import bus, { WILL_FOCUS_NODE } from "../bus";
import { INode, MousePoint } from "./INode";
import { remove, last, first, before, after, insertBefore, insertAfter } from "../../../ArrayHelper";
import { DragoverState } from "./States/DragoverState";

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
  dragoverState:IState = new DragoverState(this);
  previewState:IState = new PreviewState(this);
  //[key: string]:any;

  state:IState;
  constructor(meta:IMeta, children:Array<INode>=[]){
    this.seedId();
    //this.view = view;
    this.meta = meta;
    //this.parent = parent;
    this.state = this.normalState;
    this.rule =  resolveRule(meta);
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

  get label(){
    return this.rule.resolveLabel(this.meta);
  }

  get props(){
    const hasChildren = this.children.length === 0 && !this.meta?.props?.rxText
    const paddingX={
      paddingLeft : hasChildren ? this.rule.empertyPadding : this.rule.editPaddingX,
      paddingRight : hasChildren ? this.rule.empertyPadding : this.rule.editPaddingX,    
    }
    const paddingY={
      paddingTop : hasChildren ? this.rule.empertyPadding : this.rule.editPaddingY,
      paddingBottom : hasChildren ? this.rule.empertyPadding : this.rule.editPaddingY,
    }
    return {
      ...this.meta.props,      
      style:this.meta.props?.style,
      editClassName:'drag-node-outline ' + this.state.className,
      editStyle:{
        ...paddingX,
        ...paddingY,
        ...this.state.style,
      },

      onMouseMove : this.handleMouseMove,
      onMouseOut : this.handleMouseOut,
      onClick : this.handleClick,
    };
  }

  accept(child:INode){
    return this.rule.accept(child);
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
  toDragoverState(){
    this.toState('dragoverState');
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

  flexFlowRow(){
    return this.meta.name === 'Grid' && this.meta.props?.container && (this.meta.props?.direction !== 'column' && this.meta.props?.direction !== 'column-reverse');
  }

  removeFormParent(){
    let oldParent = this.parent;
    this.parent && remove(this, this.parent?.children);
    this.parent = undefined;
    oldParent?.view?.refresh();
  }

  moveInBottom(target:INode){
    //let oldParent = this.parent;
    //if(contains(this, target.children)){
    //  return;
    //}

    this.removeFormParent();
    
    target.children.push(this);
    this.parent = target;
    
    //oldParent?.view?.refresh();
    target.view?.refresh();
  }

  moveInTop(target:INode){
    this.removeFormParent();
    
    target.children.unshift(this);
    this.parent = target;

    target.view?.refresh();
  }

  moveBefore(target:INode){
    this.removeFormParent();
    insertBefore(this, target, target.parent?.children);
    this.parent = target.parent;
    target.parent?.view?.refresh();
  }

  moveAfter(target:INode){
    this.removeFormParent();
    insertAfter(this, target, target.parent?.children);
    this.parent = target.parent;
    target.parent?.view?.refresh();
  }

  get firstChild(){
    return first(this.children);
  }

  get lastChild(){
    return last(this.children);
  }

  get beforeBrother(){
    return before(this, this.children)
  }

  get afterBrother(){
    return after(this, this.children)
  }

  firstChildAfterMouse(point:MousePoint){
    for(let child of this.children){
      if(child.isAfterMouse(point)){
        return child;
      }
    }

    return undefined;
  }

  isAfterMouse(point:MousePoint):boolean{
    const{clientX, clientY} = point;
    let domElement = this.view?.getDom()
    if(!domElement){
      return false;
    }

    let rect = domElement.getBoundingClientRect() 

    if(rect.left >= clientX){
      return true;
    }

    if(rect.top >= clientY){
      return true;
    }

    return false;
  }

  updateProp(field:string, value:any){
    this.meta.props = !this.meta.props ? {} : this.meta.props;
    if(value){
      this.meta.props[field] = value;
    }else{
      delete this.meta.props[field];
    }

    this.view?.refresh();
  }
}