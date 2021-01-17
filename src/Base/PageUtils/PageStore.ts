import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { IMeta } from "Base/Model/IMeta";
import { IPage } from "Base/Model/IPage";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { cloneObject } from "Utils/cloneObject";

function getGQL(node:RXNode<IMeta>){
  let gql = '';
  if(node.meta.field){
    gql = gql + ` ${node.meta.field} `;
  }
  node.children.forEach(child=>{
    gql = gql + getGQL(child);
  })
  return gql;
}

export class PageStore{
  gqls: Array<GraphQLStore> = [];
  page:IPage;
  pageLayout:Array<RXNode<IMeta>> = [];
  selectModelComponentRxid?:string;

  //ActionStore
  constructor(page:IPage) {
    this.page = page;
    makeAutoObservable(this)

    this.parsePage(page);
  }

  private parsePage(page: IPage) {
    const layout = page?.schema?.layout || [];
    let root = new RXNode<IMeta>();
    root.parse(cloneObject(layout));
    this.pageLayout = root.children;
  }

  setSelectModelComponentRxid(rxid?:string){
    this.selectModelComponentRxid = rxid;
  }

  addGql(gql:GraphQLStore){
    this.gqls.push(gql);
  }

  removeGql(gql:GraphQLStore){
    this.gqls.splice(this.gqls.indexOf(gql), 1);
  }

  getFieldsGQL(){
    let gql = '';
    this.pageLayout.forEach(child=>{
      gql = gql + getGQL(child);
    })
    return `{ id ${gql}}`;
  }
}

export const PageStoreContext = createContext<PageStore|undefined>(undefined);
export const PageStoreProvider = PageStoreContext.Provider;

export const usePageStore = (): PageStore|undefined => useContext(PageStoreContext);