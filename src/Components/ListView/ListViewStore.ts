import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { remove } from "Utils/ArrayHelper";

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

export class PaginatorInfo{
  count:number = 0;
  currentPage:number = 0;
  hasMorePages:boolean = false;
  lastPage:number = 0;
  perPage:number = 0;
  total:number = 0;

  constructor() {
    makeAutoObservable(this)
  }

  setQueryResult(data:any = {}){
    const {
      count = 0, 
      currentPage = 0,
      hasMorePages = false,
      lastPage = 0,
      perPage = this.perPage,
      total = 0
    } = data

    this.count = count;
    this.currentPage = currentPage;
    this.hasMorePages = hasMorePages;
    this.lastPage  = lastPage;
    this.perPage = perPage;
    this.total = total;
  }

  setPerPage(perPage:number){
    this.perPage = perPage;
  }

  setCurrentPage(currentPage:number){
    this.currentPage = currentPage;
  }
}


export class ListViewStore{
  refreshQueryFlag:number = 1;
  rowSchemaStore:ModelStore = new ModelStore();
  columns:Array<RXNode<IMeta>> = [];
  //searchableFields:Array<string> = [];
  selects:ID[] = [];
  whereGraphiQLs: Map<string,string> = new Map<string,string>();
  orderByGraphiQLs: Map<string,string> = new Map<string,string>();
  orderByArray: Array<FieldOrder> = [];
  rows: Array<any> = [];
  loading?:boolean;
  paginatorInfo: PaginatorInfo = new PaginatorInfo();
  
  constructor() {
    makeAutoObservable(this)
  }

  setColumns(columns:Array<RXNode<IMeta>>){
    this.columns = columns;
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

  setWhereGraphiQL(rxId:string, grahpiQL: string){
    this.whereGraphiQLs.set(rxId, grahpiQL);
  }

  setOrderByGraphiQL(rxId:string, grahpiQL: string){
    this.orderByGraphiQLs.set(rxId, grahpiQL);
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

  isRowSelected(rowId:ID){
    return !!this.selects.find(id=>id === rowId);
  }

}

export const ListViewStoreContext = createContext<ListViewStore>({} as ListViewStore);
export const ListViewStoreProvider = ListViewStoreContext.Provider;

export const useListViewStore = (): ListViewStore => useContext(ListViewStoreContext);