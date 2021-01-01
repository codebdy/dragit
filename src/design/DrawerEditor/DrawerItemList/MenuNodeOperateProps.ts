import { ID } from "base/Model/graphqlTypes";
import IMenuItem from "base/Model/IMenuItem";
import { RXNode } from "base/RXNode/RXNode";

export default interface MenuNodeOperateProps {
  onClick?:()=>void,
  selectedNode?:RXNode<IMenuItem>,
  draggedNode?: RXNode<IMenuItem>;
  onSelected?: (node: RXNode<IMenuItem>) => void;
  onDragToBefore: (targetId: ID) => void;
  onDragToAfter: (targetId: ID) => void;
  onDragStart: (node: RXNode<IMenuItem>) => void;
  onDragEnd: () => void;
  onDragIn?: (targetId: ID)=>void;
}
