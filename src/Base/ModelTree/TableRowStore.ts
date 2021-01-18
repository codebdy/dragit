import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import createId from "Utils/createId";
import { IModelNode } from "./IModelNode";

export class TableRowStore {
  id:ID;
  node?: RXNode<IMeta>;
  modelStore: ModelStore;
  columns:Array<RXNode<IMeta>>;
  constructor(modelStore:ModelStore, columns?:Array<RXNode<IMeta>>) {
    this.id = createId();
    this.columns = columns || [];
    this.modelStore = modelStore;
    makeAutoObservable(this)
  }

}