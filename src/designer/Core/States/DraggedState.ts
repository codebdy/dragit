import { State } from "./State";

export class DraggedState extends State{
  className = 'dragged-node';

  enter(){
    document.body.classList.add('one-element-dragged');
  }

  leave(){
    document.body.classList.remove('one-element-dragged');
  }

}