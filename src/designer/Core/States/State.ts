import { IState } from "./IState";
import { INode } from "../Node/INode";

export class State implements IState{
  context: INode;
  style = {};
  className = '';
  
  constructor(context:INode){
    this.context = context
  }



  handleMouseMove(event:MouseEvent){
    event.stopPropagation();
  }

  handleMouseOut(event:MouseEvent){
  }

  handleClick(event:MouseEvent){
    this.context.toFocusState();
    event.stopPropagation();
  }

  //focusNode(nodeId:number){
    //(nodeId !== this.context.schema.id) && this.context.toNormalState();
  //}
  
  enter(){
  }

  leave(){
  }

}