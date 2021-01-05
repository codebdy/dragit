import { ID } from "base/Model/graphqlTypes";
import { IEditorSnapshot } from "base/Model/IEditorSnapshot";
import { IMeta } from "base/Model/IMeta";
import { RXNodeRoot } from "base/RXNode/Root";
import { RXNode } from "base/RXNode/RXNode";
import { IDragOverParam } from "design/PageEditor/Core/IDragOverParam";
import { IToolboxItem } from "design/PageEditor/Toolbox/IToolboxItem";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";


export class CanvasStore {
  showOutline:boolean = true;
  showPaddingX:boolean = true;
  showPaddingY:boolean = true;

  dragOverParam?: IDragOverParam;
  draggedNode?: RXNode<IMeta>;
  canvas?: RXNodeRoot<IMeta>;
  draggedToolboxItem?: IToolboxItem;
  selectedNode?: RXNode<IMeta>;
  undoList: Array<IEditorSnapshot> = [];
  redoList: Array<IEditorSnapshot> = [];

  refreshNodeId?:ID;

  scrollFlag:number = 0;

  constructor() {
    makeAutoObservable(this);
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

  setDragOverParam(dragOverParam?:IDragOverParam){
    this.dragOverParam = dragOverParam;
  }

  setDraggedNode(draggedNode?:RXNode<IMeta>){
    this.draggedNode = draggedNode;
  }

  setCanvas(canvas?:RXNodeRoot<IMeta>){
    this.canvas = canvas;
  }

  setDraggedToolboxItem(draggedToolboxItem?:IToolboxItem){
    this.draggedToolboxItem = draggedToolboxItem;
  }

  setSelectedNode(selectedNode?:RXNode<IMeta>){
    this.selectedNode = selectedNode
  }

  setUndoList(undoList:Array<IEditorSnapshot>){
    this.undoList = undoList;
  }

  setRedoList(redoList:Array<IEditorSnapshot>){
    this.redoList = redoList;
  }

  reset() {
    this.dragOverParam = undefined;
    this.draggedNode = undefined;
    //this.canvas?: RXNodeRoot<IMeta>;
    this.draggedToolboxItem = undefined;
    this.selectedNode = undefined;
    this.undoList = [];
    this.redoList = [];
  }

  clear(){
    this.reset();
    if(this.canvas){
      this.canvas.children = [];
      this.canvas = {...this.canvas} as any;
    }
  }

  setRefreshNodeId(refreshNodeId?:ID){
    this.refreshNodeId = refreshNodeId;
  }

  scroll(){
    this.scrollFlag ++;
    //防止溢出
    if(this.scrollFlag > 1000000){
      this.scrollFlag = 0;
    }
  }
}


export const CanvarsStoreContext = createContext<CanvasStore>({} as CanvasStore);
export const CanvarsStoreProvider = CanvarsStoreContext.Provider;
export const useCanvarsStore = (): CanvasStore => useContext(CanvarsStoreContext);