import { IState } from "./IState";
import { IContext } from "../Node/IContext";

export class State implements IState{
  context: IContext;

  constructor(context:IContext){
    this.context = context
  }

  style(){
    return {};
  }

  handleMouseEnter(){
  }

  handleMouseOut(){
  }

}