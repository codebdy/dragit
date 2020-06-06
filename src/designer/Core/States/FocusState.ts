import { State } from "./State";

export class FocusState extends State{
  style(){
    return {
      outline:"solid #5d78ff 2px",
    }
  }

  enter(){
    console.log(this.context.view.dom())
  }

  leave(){
  }

}