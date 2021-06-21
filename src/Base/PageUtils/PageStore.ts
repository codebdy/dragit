import { IMeta } from "Base/RXNode/IMeta";
import { IRxPage } from "Base/Model/IRxPage";
import { IPageJumper } from "Base/Model/IPageJumper";
import { RxNode } from "rx-drag/models/RxNode";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { cloneObject } from "rx-drag/utils/cloneObject";
import { IPageMutation } from "Base/Model/IPageMutation";

export class PageStore{
  rootNode: RxNode<IMeta>;
  submittingMutation?: IPageMutation;
  page: IRxPage;
  //ActionStore
  constructor(page:IRxPage, pageJumper?:IPageJumper) {
    this.page = page;
    makeAutoObservable(this)
    const layout = cloneObject(page?.schema || []);
    this.rootNode = new RxNode<IMeta>();
    this.rootNode.parse(cloneObject(layout));
  }


  get pageLayout(){
    return this.rootNode.children;
  }

  setSubmittingMutation(mustaion?:IPageMutation){
    this.submittingMutation = mustaion;
  }
}

export const PageStoreContext = createContext<PageStore|undefined>(undefined);
export const PageStoreProvider = PageStoreContext.Provider;

export const usePageStore = (): PageStore|undefined => useContext(PageStoreContext);