import { State } from "./State";
import bus, {FOCUS_NODE, UN_FOCUS_NODE} from "../bus";

export class FocusState extends State{
  style(){
    return {
      outline:"solid #5d78ff 2px",
    }
  }

  enter(){
    bus.emit(FOCUS_NODE, this.context)
    console.log(this.context.view.dom())
  }

  leave(){
    bus.emit(UN_FOCUS_NODE, this.context)
  }

}