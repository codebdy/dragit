import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";

export interface ICommand{
  //返回selectedNode
  excute: () => RXNode<IMeta>|undefined;
  //返回selectedNode
  undo: () => RXNode<IMeta>|undefined;
}