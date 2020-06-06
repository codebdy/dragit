import { State } from "./State";

export class ActiveState extends State{
  style(){
    return {
      outline:"solid #5d78ff 1px",
    }
  }

  handleMouseOut(event:MouseEvent){
    this.context.toNormalState();
  }

}