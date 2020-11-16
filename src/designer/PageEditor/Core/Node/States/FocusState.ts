import { State } from "./State";
import bus, {UN_FOCUS_NODE, FOCUS_NODE} from "../../bus";

export class FocusState extends State{
  style = {
      outline:"solid #5d78ff 2px",
  };
  

  enter(){
    bus.emit(FOCUS_NODE, this.node);
  }

  leave(){
    bus.emit(UN_FOCUS_NODE, this.node);
  }

}