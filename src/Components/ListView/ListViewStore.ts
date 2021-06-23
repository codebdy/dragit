import { ID } from "rx-drag/models/baseTypes";
import { IMeta } from "Base/RXNode/IMeta";
import { RXModel } from "Base/ModelTree/RXModel";
import { RxNode } from "rx-drag/models/RxNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { remove } from "rx-drag/utils/ArrayHelper";
import { makeTableModel } from "../../Base/ModelTree/makeTableModel";
import { PaginatorInfo } from "./PaginatorInfo";
import { MagicQueryMeta } from "../../Data/MagicQueryMeta";
import { ASC, DESC } from "Components/common/contants";

type Order = 'asc' | 'desc';
export class FieldOrder {
  field: string;
  direction: Order;

  constructor(field:string, direction:Order) {
    this.field = field;
    this.direction = direction;
    makeAutoObservable(this)
  }

  setField(field:string){
    this.field = field;
  }

  setDirection(direction:Order){
    this.direction = direction;
  }
}

interface Updating{
  field:string;
  ids:Array<ID>;
}


export class ListViewStore{
  tableRxNode?: RxNode<IMeta>;
  selects: ID[] = [];
  orderByArray: Array<FieldOrder> = [];
  rxModel?: RXModel; 
  paginatorInfo: PaginatorInfo = new PaginatorInfo();
  selectable?: boolean = true;
  queryMeta?: MagicQueryMeta;
  whereSQLs: Map<string,string> = new Map<string,string>();
  rows?: any[] = [];
  
  constructor(queryMeta?:MagicQueryMeta) {
    this.queryMeta = queryMeta;
    makeAutoObservable(this)
  }

  setSelectable(selectable:boolean){
    this.selectable = selectable;
  }
  
  get columns(){
    return this.tableRxNode?.children || []
  }

  setTableRxNode(node?:RxNode<IMeta>){
    this.tableRxNode = node;
    if(node){
      this.rxModel = new RXModel(node, 'ListView' + node.id);      
    }

  }

  setSelects(selects:ID[]){
    this.selects = selects;
  }

  toggleSelect(id:ID){
    const indexOf = this.selects.indexOf(id);
    if(indexOf > -1){
      this.selects.splice(indexOf, 1);
    }
    else{
      this.selects.push(id);
    }
  }

  isSelected(id:ID){
    return this.selects.indexOf(id) > -1
  }

  setWhereSQL(rxId:string, sql?: string){
    if(sql){
      this.whereSQLs.set(rxId, sql);
    }
    else{
      this.whereSQLs.delete(rxId);
    }
  }

  toWhereSQL(){
    const sqlsArray:string[] = []

    this.whereSQLs.forEach(sql=>{
      sqlsArray.push(`(${sql})`)
    })
    return sqlsArray.join(' AND ');
  }

  getOrderBy(field:string){
    for(var i = 0; i < this.orderByArray.length; i++){
      if(field === this.orderByArray[i].field){
        return this.orderByArray[i]
      }
    }
  }

  sortField(field: string){
    let order = this.getOrderBy(field);
    if(order){
      if(order.direction === ASC){
        order.setDirection(DESC);
      }else if(order.direction === DESC){
        remove(order, this.orderByArray);
      }
    }else{
      this.orderByArray.push(new FieldOrder(field, ASC));
    }

  };

  getSortMetas(){
    if(this.orderByArray.length === 0){
      return undefined;
    }

    const sortMetas = {} as any;
    this.orderByArray.forEach(sortMeta=>{
      sortMetas[sortMeta.field] = sortMeta.direction;
    })
    return sortMetas;
  }

  getFieldDirection(field?:string){
    if(!field){
      return;
    }

    return this.getOrderBy(field)?.direction;
  }

  isRowSelected(rowId:ID){
    return !!this.selects.find(id=>id === rowId);
  }

  setRows(rows?:Array<any>){
    makeTableModel(rows, this.rxModel, this.tableRxNode, 'ListViewBodyTableRow')
    this.rows = rows;
  }

  setLoading(loading?:boolean){
    this.rxModel?.setLoading(loading);
  }

  setUpdatingSelects(field:string){
    this.rxModel?.childrenMap.forEach(rowStore=>{
      if(this.isSelected(rowStore.value?.id)){
        rowStore.setChildLoading(field, true);        
      }
    })
  }

  setUpdating(id:ID, field:string){
    this.rxModel?.childrenMap.forEach(rowStore=>{
      if(rowStore.value?.id === id){
        rowStore.setChildLoading(field, true);        
      }
    })
  }

  setRemovingSelects(){
    this.rxModel?.childrenMap.forEach(rowStore=>{
      if(this.isSelected(rowStore.value?.id)){
        rowStore.setLoading(true);        
      }
    })
  }

  setRemoving(id:ID){
    this.rxModel?.childrenMap.forEach(rowStore=>{
      if(rowStore.value?.id === id){
        rowStore.setLoading(true); 
      }
    })
  }

  finishMutation(){
    this.rxModel?.setLoading(false);
  }
}

export const ListViewStoreContext = createContext<ListViewStore>({} as ListViewStore);
export const ListViewStoreProvider = ListViewStoreContext.Provider;

export const useListViewStore = (): ListViewStore => useContext(ListViewStoreContext);