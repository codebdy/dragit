import { ID } from "Base/Model/graphqlTypes";
import IMenuItem from "Base/Model/IMenuItem";
import { RXNode } from "Base/RXNode/RXNode";

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
