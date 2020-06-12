import { IState } from "./IState";
import { IContext } from "../Node/IContext";

export class State implements IState{
  context: IContext;
  style = {};
  className = '';
  
  constructor(context:IContext){
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