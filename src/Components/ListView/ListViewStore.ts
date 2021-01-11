import { ID } from "Base/Model/graphqlTypes";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class ListViewStore{
  refreshQueryFlag:number = 1;
  rowSchemaStore:ModelStore = new ModelStore();
  searchableFields:Array<string> = [];
  selects:ID[] = [];
  whereGraphiQLs: Map<string,string> = new Map<string,string>();
  orderByGraphiQLs:Map<string,string> = new Map<string,string>();
  
  constructor() {
    makeAutoObservable(this)
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

}

export const ListViewStoreContext = createContext<ListViewStore>({} as ListViewStore);
export const ListViewStoreProvider = ListViewStoreContext.Provider;

export const useListViewStore = (): ListViewStore => useContext(ListViewStoreContext);