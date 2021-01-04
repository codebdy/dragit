import { ID } from "base/Model/graphqlTypes";
import { makeAutoObservable } from "mobx"

export class Designer{
  areaSelect:boolean = false; 
  showOutline:boolean = true;
  showPaddingX:boolean = true;
  showPaddingY:boolean = true;
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

  setShowOutline(showOutline:boolean){
    this.showOutline = showOutline;
  }

  setShowPaddingX(showPaddingX:boolean){
    this.showPaddingX = showPaddingX;
  }

  setShowPaddingY(showPaddingY:boolean){
    this.showPaddingY = showPaddingY;
  }

}