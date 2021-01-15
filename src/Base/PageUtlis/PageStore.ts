import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class PageStore{
  gqls: Array<GraphQLStore> = [];
  //ActionStore
  constructor() {
    makeAutoObservable(this)
  }

  addGql(gql:GraphQLStore){
    this.gqls.push(gql)
  }

  removeGql(gql:GraphQLStore){
    this.gqls.splice(this.gqls.indexOf(gql), 1);
  }
}

export const PageStoreContext = createContext<PageStore|undefined>(undefined);
export const PageStoreProvider = PageStoreContext.Provider;

export const usePageStore = (): PageStore|undefined => useContext(PageStoreContext);