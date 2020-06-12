import { State } from "./State";

export class NormalState extends State{
  handleMouseMove(event:MouseEvent){
    this.context.toActiveState()
    event.stopPropagation()
    //console.log('normal mouse move')
  }

  handleMouseOut(event:MouseEvent){
    //console.log('normal mouse out')
  }
}