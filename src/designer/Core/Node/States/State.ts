import { IState } from "./IState";
import { INode } from "../INode";
declare var window: {draggedNode:INode};

export class State implements IState{
  context: INode;
  style = {};
  className = '';
  
  constructor(context:INode){
    this.context = context
  }

  handleMouseMove(event:MouseEvent){
    //window.draggedNode?.moveInBottom(this.context);
    //event.stopPropagation();
  }

  handleMouseOut(event:MouseEvent){
  }

  handleClick(event:MouseEvent){
    this.context.toFocusState();
    event.stopPropagation();
  }

  enter(){
  }

  leave(){
  }

}