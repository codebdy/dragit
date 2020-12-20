import { makeAutoObservable } from "mobx"

export class Designer{
  areaSelect:boolean = false; 
  opened:boolean = false;
  pageSlug:string = '';
  showOutline:boolean = true;
  showPaddingX:boolean = true;
  showPaddingY:boolean = true;
  constructor() {
    makeAutoObservable(this)
  }

  setAreaSelect(isSelect:boolean){
    this.areaSelect = isSelect;
  }

  open(){
    this.opened = true;
  }

  close(){
    this.opened = false;
  }

  setPageSlug(slug:string){
    this.pageSlug = slug;
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