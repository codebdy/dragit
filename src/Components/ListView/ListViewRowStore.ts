import { IMeta } from "Base/Model/IMeta";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";

export class ListViewRowStore{
  modelStore: ModelStore;
  columns:Array<RXNode<IMeta>>;
  constructor(modelStore:ModelStore, columns?:Array<RXNode<IMeta>>) {
    this.columns = columns || [];
    this.modelStore = modelStore;
    makeAutoObservable(this)
  }

}