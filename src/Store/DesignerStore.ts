import { ID } from "rx-drag/models/baseTypes";
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