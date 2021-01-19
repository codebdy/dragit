import { IMeta } from "Base/Model/IMeta";
import { RXModel } from "Base/ModelTree/RXModel";
import { RXNode } from "Base/RXNode/RXNode";

export function makeTableModel(rows: Array<any> | undefined, parentRxModel: RXModel | undefined, rxNode: RXNode<IMeta> | undefined, rowComponentName: string) {
  parentRxModel?.clearChildren();
  rows?.forEach((row) => {
    makeTableRowModel(rows, parentRxModel, rxNode, rowComponentName);
  });
}

export function makeTableRowModel(rows: any[], parentRxModel: RXModel | undefined,  rxNode: RXNode<IMeta> | undefined,  rowComponentName: string) {
  const rowRxNode = RXNode.make({ name: rowComponentName });
  const columns = rxNode?.clone()?.children;
  rowRxNode.setChildren(columns);
  //index作为key，在setModel中使用索引取值，model为数组跟普通对象的区别，
  const rowModel = new RXModel(rowRxNode, parentRxModel?.childrenMap.size || 0);
  rowModel.setModel(rows);
  parentRxModel?.setChild(rowRxNode.id, rowModel);
}

