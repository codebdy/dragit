import { IState } from "./IState";
import { INode } from "../INode";
declare var window: {draggedNode:INode};

export class State implements IState{
  node: INode;
  style = {};
  className = '';
  
  constructor(context:INode){
    this.node = context
  }

  handleMouseMove(event:MouseEvent){
    //window.draggedNode?.moveInBottom(this.context);
    //event.stopPropagation();
  }

  handleMouseOut(event:MouseEvent){
  }

  handleClick(event:MouseEvent){
    this.node.toFocusState();
    event.stopPropagation();
  }

  enter(){
  }

  leave(){
  }

}