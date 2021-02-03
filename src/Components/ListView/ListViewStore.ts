import { ID } from "rx-drag/models/baseTypes";
import { IMeta } from "Base/RXNode/IMeta";
import { RXModel } from "Base/ModelTree/RXModel";
import { RxNode } from "rx-drag/models/RxNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { remove } from "rx-drag/utils/ArrayHelper";
import { makeTableModel } from "../../Base/ModelTree/makeTableModel";
import { PaginatorInfo } from "./PaginatorInfo";

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
  refreshQueryFlag:number = 1;
  tableRxNode?: RxNode<IMeta>;
  selects:ID[] = [];
  whereGraphQLs: Map<string,string> = new Map<string,string>();
  orderByArray: Array<FieldOrder> = [];
  //rows: Array<TableRowStore> = [];
  rxModel?:RXModel; 
  paginatorInfo: PaginatorInfo = new PaginatorInfo();
  selectable?:boolean = true;
  
  constructor() {
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

  setWhereGraphQL(rxId:string, grahpiQL: string){
    this.whereGraphQLs.set(rxId, grahpiQL);
  }

  toWhereGaphiQL(){
    let gqls = ''
    this.whereGraphQLs.forEach(gql=>{
      gqls = gqls + ' ' + gql
    })
    return gqls
    ? `
        {
          AND:[
            ${ gqls }
          ]
        }
      `
    : '{}'
  }

  excuteQuery(){
    this.refreshQueryFlag ++;
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
      if(order.direction === 'asc'){
        order.setDirection('desc');
      }else if(order.direction === 'desc'){
        remove(order, this.orderByArray);
      }
    }else{
      this.orderByArray.push(new FieldOrder(field, 'asc'));
    }

  };

  getFieldDirection(field?:string){
    if(!field){
      return;
    }

    return this.getOrderBy(field)?.direction;
  }

  toOrderByGraphQL(){
    let gqls = '';
    this.orderByArray.forEach(gql=>{
      gqls = gqls + `{column:${gql.field}, order:${gql.direction.toUpperCase()}}`
    })

    return `[${gqls}]`
  }

  isRowSelected(rowId:ID){
    return !!this.selects.find(id=>id === rowId);
  }

  getQueryVariables(){
    return {first:this.paginatorInfo.perPage, page:this.paginatorInfo.currentPage}
  }

  setRows(rows?:Array<any>){
    makeTableModel(rows, this.rxModel, this.tableRxNode, 'ListViewBodyTableRow')
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