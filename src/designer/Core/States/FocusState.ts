import { State } from "./State";
import bus, {UN_FOCUS_NODE, FOCUS_NODE} from "../bus";

export class FocusState extends State{
  style(){
    return {
      outline:"solid #5d78ff 2px",
    }
  }

  enter(){
    console.log('Enter Focus', this.context.schema.id);
    bus.emit(FOCUS_NODE, this.context);
  }

  leave(){
    console.log('Leave Focus', this.context.schema.id);
    bus.emit(UN_FOCUS_NODE, this.context);
  }

}