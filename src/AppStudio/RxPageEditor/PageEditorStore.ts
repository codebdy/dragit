import { IRxPage } from "Base/Model/IRxPage";
import { makeAutoObservable } from "mobx";


export class PageEditorStore {
  editingPage?:IRxPage;
  isDirty?:boolean;
  currentData?:IRxPage;
  constructor(editingPage?:IRxPage) {
    this.editingPage = editingPage;
    makeAutoObservable(this);
  }

  setCurrentData(currentData?:IRxPage){
    this.currentData = currentData;
    this.isDirty = true;
  }

  setIsDirty(isDirty?:boolean){
    this.isDirty = isDirty;
  }
}
