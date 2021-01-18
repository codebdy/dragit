import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import createId from "Utils/createId";
import { IModelNode } from "./IModelNode";
import { TableRowStore } from "./TableRowStore";

export class TableStore{
  id:ID;
  refreshQueryFlag:number = 1;
  node?: RXNode<IMeta>;
  rows: Array<TableRowStore> = [];
  loading?:boolean;
  
  constructor() {
    this.id = createId();
    makeAutoObservable(this)
  }
  
  get columns(){
    return this.node?.children || []
  }

  setNode(node?:RXNode<IMeta>){
    this.node = node;
  }

  setRows(rows?:Array<any>){
    this.rows = rows?.map((row)=> {
      const columns = this.node?.clone()?.children;
      const rowModelStroe = new ModelStore(row);
      return new TableRowStore(rowModelStroe, columns);      
    }) || [];
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

}
