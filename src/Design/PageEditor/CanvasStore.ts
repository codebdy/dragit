import { ID } from "Base/Model/graphqlTypes";
import { IEditorSnapshot } from "Base/Model/IEditorSnapshot";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { IDragOverParam } from "Design/PageEditor/Core/IDragOverParam";
import { IToolboxItem } from "Design/PageEditor/Toolbox/IToolboxItem";
import { makeAutoObservable } from "mobx";

export class CanvasStore {
  showOutline:boolean = true;
  showPaddingX:boolean = true;
  showPaddingY:boolean = true;

  activeNode?: RXNode<IMeta>;
  dragOverParam?: IDragOverParam;
  draggedNode?: RXNode<IMeta>;
  canvas?: RXNode<IMeta>;
  draggedToolboxItem?: IToolboxItem;
  selectedNode?: RXNode<IMeta>;
  undoList: Array<IEditorSnapshot> = [];
  redoList: Array<IEditorSnapshot> = [];

  //refreshNodeId?:ID;
  waitingRefreshNodeIds:ID[]= [];
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

  setActiveNode(activeNode?:RXNode<IMeta>){
    this.activeNode = activeNode;
  }

  setDragOverParam(dragOverParam?:IDragOverParam){
    this.dragOverParam = dragOverParam;
  }

  setDraggedNode(draggedNode?:RXNode<IMeta>){
    this.draggedNode = draggedNode;
  }

  setCanvas(canvas?:RXNode<IMeta>){
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
    this.draggedToolboxItem = undefined;
    this.selectedNode = undefined;
    this.activeNode = undefined;
    this.undoList = [];
    this.redoList = [];
  }

  clear(){
    this.selectedNode = undefined;
    if(this.canvas){
      this.canvas.children = [];
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

  finishFrefrehNode(nodeId:ID){
    this.waitingRefreshNodeIds.splice(this.waitingRefreshNodeIds.indexOf(nodeId), 1);
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

}
