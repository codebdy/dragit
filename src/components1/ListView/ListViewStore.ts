import { ID } from "base1/Model/graphqlTypes";
import { ModelStore } from "base1/ModelTree/ModelStore";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class ListViewStore{
  rowSchemaStore:ModelStore = new ModelStore();
  selects:ID[] = [];
  keywords?:string;
  
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

  setKeywords(keywords?:string){
    this.keywords = keywords;
  }
}

export const ListViewStoreContext = createContext<ListViewStore>({} as ListViewStore);
export const ListViewStoreProvider = ListViewStoreContext.Provider;

export const useListViewStore = (): ListViewStore => useContext(ListViewStoreContext);