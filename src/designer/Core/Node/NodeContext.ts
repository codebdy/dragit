import { IView } from "./IView";
import { IContext } from "./IContext";

export class NodeContext implements IContext{
  view:IView | undefined;

  constructor(view :IView){
    this.view = view;
  }
}