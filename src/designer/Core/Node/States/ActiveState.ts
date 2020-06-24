import { State } from "./State";
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from "../../bus";

export class ActiveState extends State{
  style = {
    outline:"solid #5d78ff 1px",
  };

  handleMouseMove(event:MouseEvent){
    event.stopPropagation();
  }

  handleMouseOut(event:MouseEvent){
    this.node.toNormalState();
  }

  enter(){
    bus.emit(ACTIVE_NODE, this.node)
  }

  leave(){
    bus.emit(UN_ACTIVE_NODE, this.node)
  }

}