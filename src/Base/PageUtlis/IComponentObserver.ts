import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";


export interface IComponentObserver {
  onRender: (node: RXNode<IMeta>) => void;
  onDestory: (node: RXNode<IMeta>) => void;
}
