import { IRxAuth } from "Base/Model/IRxAuth";
import { RxDragStore } from "rx-drag/store/RxDragStore";
import { cloneObject } from "rx-drag/utils/cloneObject";
import { ICommand } from "../../../rx-drag/commands/ICommand";
import { PageEditorStore } from "../PageEditorStore";

export type PagePropName = 'query'|'auths'|'max_width'|'width';
export type PagePropValue = string|Array<IRxAuth>|number|undefined;

export class UpdatePageCommand implements ICommand{
  rxDragStore?:RxDragStore;
  pageEditor:PageEditorStore;
  key:string;
  oldValue?:PagePropValue;
  value?:PagePropValue;

  constructor(rxDragStore:RxDragStore, pageEditor:PageEditorStore, key:PagePropName, value:PagePropValue){
    this.pageEditor = pageEditor;
    this.key = key;
    this.value = cloneObject(value);
    this.oldValue = pageEditor.currentData ? pageEditor.currentData[key] : undefined;
    this.rxDragStore = rxDragStore;
  }

  excute(){
    if(this.pageEditor.currentData){
      this.pageEditor.setCurrentData({...this.pageEditor.currentData, [this.key]:this.value})
    }
    return this.rxDragStore?.selectedNode;
  }

  undo(){
    if(this.pageEditor.currentData){
      this.pageEditor.setCurrentData({...this.pageEditor.currentData, [this.key]:this.oldValue})
    }
    return this.rxDragStore?.selectedNode;
  }
}