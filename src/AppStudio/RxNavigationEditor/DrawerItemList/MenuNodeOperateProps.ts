import { ID } from "rx-drag/models/baseTypes";
import IMenuItem from "Base/Model/IMenuItem";
import { RxNode } from "rx-drag/models/RxNode";

export default interface MenuNodeOperateProps {
  onClick?:()=>void,
  selectedNode?:RxNode<IMenuItem>,
  draggedNode?: RxNode<IMenuItem>;
  onSelected?: (node: RxNode<IMenuItem>) => void;
  onDragToBefore: (targetId: ID) => void;
  onDragToAfter: (targetId: ID) => void;
  onDragStart: (node: RxNode<IMenuItem>) => void;
  onDragEnd: () => void;
  onDragIn?: (targetId: ID)=>void;
}
