import { makeAutoObservable } from "mobx";

export class RxDragStore{
  rightFolded : boolean = false;

  constructor() {
    makeAutoObservable(this)
  }

  foldRight(){
    this.rightFolded = true;
  }

  expandRight(){
    this.rightFolded = false;
  }
}