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

  activeNode?: RXNode<IMeta>;
  dragOverParam?: IDragOverParam;
  draggedNode?: RXNode<IMeta>;
  canvas?: RXNodeRoot<IMeta>;
  draggedToolboxItem?: IToolboxItem;
  selectedNode?: RXNode<IMeta>;
  undoList: Array<IEditorSnapshot> = [];
  redoList: Array<IEditorSnapshot> = [];

  //refreshNodeId?:ID;
  waitingRefreshNodeIds:ID[]= [];
  scrollFlag:number = 0;
  selectedNodeDom?:HTMLElement;

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

  setActiveNode(activeNode?:RXNode<IMeta>){
    this.activeNode = activeNode;
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

  refreshNode(nodeId?:ID){
    if(nodeId){
      this.waitingRefreshNodeIds.push(nodeId);      
    }
  }

  needRefresh(nodeId:ID){
    return !!this.waitingRefreshNodeIds.find((id)=>id === nodeId)
  }

  removeFrefrehNodeId(id:ID){
    this.waitingRefreshNodeIds.splice(this.waitingRefreshNodeIds.indexOf(id), 1);
  }

  scroll(){
    this.scrollFlag ++;
    //防止溢出
    if(this.scrollFlag > 1000000){
      this.scrollFlag = 0;
    }
  }

  popUndoList(){
    return this.undoList.pop();
  }

  pushUndoList(snapshot:IEditorSnapshot){
    return this.undoList.push(snapshot);
  }

  popRedoList(){
    return this.redoList.pop();
  }

  pushRedoList(snapshot:IEditorSnapshot){
    return this.redoList.push(snapshot);
  }

  setSelectedNodeDom(dom:HTMLElement){
    this.selectedNodeDom = dom;
  }

}


export const CanvarsStoreContext = createContext<CanvasStore>({} as CanvasStore);
export const CanvarsStoreProvider = CanvarsStoreContext.Provider;
export const useCanvarsStore = (): CanvasStore => useContext(CanvarsStoreContext);