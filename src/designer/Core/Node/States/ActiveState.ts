import { State } from "./State";
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from "../../bus";

export class ActiveState extends State{
  style = {
    outline:"solid #5d78ff 1px",
  };
  

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