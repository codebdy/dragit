import { State } from "./State";
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from "../../bus";
import { INode } from "../INode";

declare var window: {draggedNode:INode};

export class ActiveState extends State{
  style = {
    outline:"solid #5d78ff 1px",
  };
  
  handleMouseMove(event:MouseEvent){
    window.draggedNode?.moveInBottom(this.context);
    event.stopPropagation();
  }

  handleMouseOut(event:MouseEvent){
    this.context.toNormalState();
  }

  enter(){
    bus.emit(ACTIVE_NODE, this.context)
  }

  leave(){
    bus.emit(UN_ACTIVE_NODE, this.context)
  }

}