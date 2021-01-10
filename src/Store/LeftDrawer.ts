import { makeAutoObservable } from "mobx"

export class LeftDrawer{
  compactable:boolean = false;
  compactWidth:number = 70;
  fullWidth:number = 260;
  hover:boolean = true;
  mobileOpen:boolean = false;

  constructor() {
    makeAutoObservable(this)
  }

  get width(){
    return this.compactable ? this.compactWidth : this.fullWidth;
  }

  get isMini(){
    return  this.compactable && !this.hover;
  }

  toggleCompactable(){
    this.compactable = ! this.compactable;
  }

  mouseEnter(){
    this.hover = true;
  }

  mouseOut(){
    this.hover = false;
  }

  openOnMobile(){
    this.mobileOpen = true;
  }

  closeOnMobile(){
    this.mobileOpen = false;
  }
}