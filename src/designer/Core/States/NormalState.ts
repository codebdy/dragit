import { State } from "./State";

export class NormalState extends State{
  handleMouseEnter(){
    this.context.toActiveState()
  }

  handleMouseOut(){
  }
}