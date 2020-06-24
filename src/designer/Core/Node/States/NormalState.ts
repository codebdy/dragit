import { State } from "./State";

declare var window: {draggedNode:any};
export class NormalState extends State{
  handleMouseMove(event:MouseEvent){
    window.draggedNode ? this.node.toDragoverState() : this.node.toActiveState()
    event.stopPropagation()
    //console.log('normal mouse move')
  }

  handleMouseOut(event:MouseEvent){
    //console.log('normal mouse out')
  }
}