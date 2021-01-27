import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/RxNode";

export interface ICommand{
  //返回selectedNode
  excute: () => RxNode<IMeta>|undefined;
  //返回selectedNode
  undo: () => RxNode<IMeta>|undefined;
}