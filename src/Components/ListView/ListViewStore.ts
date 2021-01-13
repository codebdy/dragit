import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { remove } from "Utils/ArrayHelper";
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
  rowSchemaStore:ModelStore = new ModelStore();
  columns:Array<RXNode<IMeta>> = [];
  selects:ID[] = [];
  whereGraphiQLs: Map<string,string> = new Map<string,string>();
  orderByArray: Array<FieldOrder> = [];
  rows: Array<ModelStore> = [];
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

  toWhereGaphiQL(){
    let gqls = ''
    this.whereGraphiQLs.forEach(gql=>{
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

  toOrderByGraphiQL(){
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
    this.rows = rows?.map((row)=>new ModelStore(row)) || [];
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  setUpdatingSelects(field:string){
    this.rows.forEach(rowStore=>{
      if(this.isSelected(rowStore.model.id)){
        rowStore.setFieldLoading(field, true);        
      }
    })
  }

  setRemovingSelects(){
    this.rows.forEach(rowStore=>{
      if(this.isSelected(rowStore.model.id)){
        rowStore.setLoading(true);        
      }
    })
  }

  finishMutation(){
    this.rows.forEach(rowStore=>{
      rowStore.setLoading(false);
    })
  }


}

export const ListViewStoreContext = createContext<ListViewStore>({} as ListViewStore);
export const ListViewStoreProvider = ListViewStoreContext.Provider;

export const useListViewStore = (): ListViewStore => useContext(ListViewStoreContext);