import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { IMeta } from "Base/Model/IMeta";
import { IPage } from "Base/Model/IPage";
import { IPageJumper } from "Base/Model/IPageJumper";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { cloneObject } from "Utils/cloneObject";
import intl from "react-intl-universal";
import { getNodeGQL } from "./getNodeGQL";

export class PageStore{
  gqls: Array<GraphQLStore> = [];
  rootNode: RXNode<IMeta>;
  page: IPage;
  selectModelComponentRxid?: string;
  queryGQL?: GraphQLStore;
  //ActionStore
  constructor(page:IPage, pageJumper?:IPageJumper) {
    this.page = page;
    makeAutoObservable(this)
    const layout = page?.schema?.layout || [];
    this.rootNode = new RXNode<IMeta>();
    this.rootNode.parse(cloneObject(layout));
    const query = page?.schema?.query;
    if(query){
      this.queryGQL = new GraphQLStore(intl.get('data-query'), 'Page', `
        query ($id:ID){
          ${query}(id:$id)
          ${this.getFieldsGQL()} 
        }
      `);

      if(pageJumper?.dataId){
        this.queryGQL.setVariables({id:pageJumper?.dataId})        
      }
      //Debug用
      this.gqls.push(this.queryGQL);      
    }
  }


  get pageLayout(){
    return this.rootNode.children;
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
      gql = gql + getNodeGQL(child);
    })
    return `{ id ${gql}}`;
  }
}

export const PageStoreContext = createContext<PageStore|undefined>(undefined);
export const PageStoreProvider = PageStoreContext.Provider;

export const usePageStore = (): PageStore|undefined => useContext(PageStoreContext);