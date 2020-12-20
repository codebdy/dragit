import { makeAutoObservable } from "mobx"
import { sidebarImg5 } from "./theme/reducers";

export class LeftDrawer{
  compactable:boolean = false;
  compactWidth:number = 70;
  fullWidth:number = 260;
  hover:boolean = true;

  backgroundImage:string = sidebarImg5;
  backgroundMask:string = 'linear-gradient(45deg,#780206,#061161)';

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
}