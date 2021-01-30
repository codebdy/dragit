import IMenuItem from "Base/Model/IMenuItem";
import { makeAutoObservable } from "mobx";

export class NavigationEditorStore {
  isDirty?:boolean;
  currentData?:Array<IMenuItem>;
  constructor() {
    makeAutoObservable(this);
  }

  setCurrentData(currentData?:Array<IMenuItem>){
    this.currentData = currentData;
    this.isDirty = true;
  }

  setIsDirty(isDirty?:boolean){
    this.isDirty = isDirty;
  }
}
