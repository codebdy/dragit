import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { IComponentObserver } from "./IComponentObserver";

export class PageStore{
  gqls: Array<GraphQLStore> = [];
  componentObservers:Array<IComponentObserver> = [];
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

  addComponentObserver(comObserver:IComponentObserver){
    this.componentObservers.push(comObserver);
  }

  removeComponentObserver(comObserver:IComponentObserver){
    this.componentObservers.splice(this.componentObservers.indexOf(comObserver));
  }

  onRender(node:RXNode<IMeta>){
    this.componentObservers.forEach(comObserver=>{
      comObserver.onRender(node)
    })
  }

  onDestory(node:RXNode<IMeta>){
    this.componentObservers.forEach(comObserver=>{
      comObserver.onDestory(node)
    })
  }
}

export const PageStoreContext = createContext<PageStore|undefined>(undefined);
export const PageStoreProvider = PageStoreContext.Provider;

export const usePageStore = (): PageStore|undefined => useContext(PageStoreContext);