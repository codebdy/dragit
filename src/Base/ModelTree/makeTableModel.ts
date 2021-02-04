import { IMeta } from "Base/RXNode/IMeta";
import { RXModel } from "Base/ModelTree/RXModel";
import { RxNode } from "rx-drag/models/RxNode";

export function makeTableModel(rows: Array<any> | undefined, parentRxModel: RXModel | undefined, rxNode: RxNode<IMeta> | undefined, rowComponentName: string) {
  parentRxModel?.setIsTable(true);
  parentRxModel?.clearChildren();
  rows?.forEach((row) => {
    makeTableRowModel(rows, parentRxModel, rxNode, rowComponentName);
  });
}

export function makeTableRowModel(rows: any[], parentRxModel: RXModel | undefined,  rxNode: RxNode<IMeta> | undefined,  rowComponentName: string) {
  const rowRxNode = RxNode.make({ name: rowComponentName });
  const columns = rxNode?.clone()?.children;
  rowRxNode.setChildren(columns);
  //index作为key，在setModel中使用索引取值，model为数组跟普通对象的区别，
  const key = parentRxModel?.childrenMap.size || 0;
  const rowModel = new RXModel(rowRxNode, key);
  
  rowModel.initWithModel(rows);
  parentRxModel?.setChild(rowModel.id, rowModel);
  parentRxModel?.getChildren().forEach((child, index)=>{
    child.setLabel((index + 1).toString());
  })
}

