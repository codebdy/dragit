import { State } from "./State";

export class DraggedState extends State{
  style(){
    return {
      background: "yellow",
    }
  }

  enter(){
    document.body.classList.add('one-element-dragged');
  }

  leave(){
    document.body.classList.remove('one-element-dragged');
  }

}