import { ID } from "base1/Model/graphqlTypes";
import { makeAutoObservable } from "mobx"

export class DesignerStore{
  areaSelect:boolean = false; 
  pageId?:ID;
  constructor() {
    makeAutoObservable(this)
  }

  setAreaSelect(isSelect:boolean){
    this.areaSelect = isSelect;
  }

  designPage(pageId:ID){
    this.pageId = pageId;
  }

  close(){
    this.pageId = undefined;
  }
}