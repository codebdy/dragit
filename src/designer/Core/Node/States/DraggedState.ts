import { State } from "./State";
import bus, { DRAGE_NODE, UN_DRAGE_NODE } from "../../bus";

export class DraggedState extends State{
  className = 'dragged-node';

  enter(){
    document.body.classList.add('one-element-dragged');
    bus.emit(DRAGE_NODE, this.context)
  }

  leave(){
    document.body.classList.remove('one-element-dragged');
    bus.emit(UN_DRAGE_NODE, this.context)
  }

}