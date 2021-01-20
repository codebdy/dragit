import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { CursorPosition, IDragOverParam } from "Design/PageEditor/Core/IDragOverParam";
import { IToolboxItem } from "Design/PageEditor/Toolbox/IToolboxItem";
import { makeAutoObservable } from "mobx";
import { ClearCommand } from "./Commands/ClearCommand";
import { ICommand } from "./Commands/ICommand";
import { MoveAfterCommand } from "./Commands/MoveAfterCommand";
import { MoveBeforeCommand } from "./Commands/MoveBeforeCommand";
import { MoveInCommand } from "./Commands/MoveInCommand";
import { MoveInTopCommand } from "./Commands/MoveInTopCommand";

export class PageEditorStore {
  showOutline:boolean = true;
  showPaddingX:boolean = true;
  showPaddingY:boolean = true;

  activeNode?: RXNode<IMeta>;
  dragOverParam?: IDragOverParam;
  draggedNode?: RXNode<IMeta>;
  canvas?: RXNode<IMeta>;
  draggedToolboxItem?: IToolboxItem;
  selectedNode?: RXNode<IMeta>;
  selectedDom: Element|null = null;
  undoList: Array<ICommand> = [];
  redoList: Array<ICommand> = [];

  //refreshNodeId?:ID;
  //waitingRefreshNodeIds:ID[]= [];
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

  setSelectedDom(selectedDom:Element|null){
    this.selectedDom = selectedDom;
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
    if(this.canvas){
        this.excuteCommand(new ClearCommand(this.canvas, this.selectedNode));
    }

  }

  //refreshNode(nodeId?:ID){
  //  if(nodeId){
  //    this.waitingRefreshNodeIds.push(nodeId);      
  //  }
  //}

  //needRefresh(nodeId:ID){
  //  return !!this.waitingRefreshNodeIds.find((id)=>id === nodeId)
  //}

  //finishFrefrehNode(nodeId:ID){
  //  this.waitingRefreshNodeIds.splice(this.waitingRefreshNodeIds.indexOf(nodeId), 1);
  //}

  scroll(){
    this.scrollFlag ++;
    //防止溢出
    if(this.scrollFlag > 1000000){
      this.scrollFlag = 0;
    }
  }

  excuteCommand(command:ICommand){
    const selectedNode = command.excute();
    this.setSelectedNode(selectedNode);
    this.undoList.push(command);
    this.redoList = [];
  }

  undo(){
    const cmd = this.undoList.pop();
    const selectedNode = cmd?.undo();
    if(cmd){
      this.redoList.push(cmd);
    }
    this.setSelectedNode(selectedNode);
  }

  redo(){
    const cmd = this.redoList.pop();
    const selectedNode = cmd?.excute();
    if(cmd){
      this.undoList.push(cmd);
    }
    this.setSelectedNode(selectedNode);
  }

  operateNode (draggedNode:RXNode<IMeta>, targetNode:RXNode<IMeta>, position:CursorPosition){
    if(targetNode.id === draggedNode.id){
      return false;
    }
    if(position === 'in-bottom' || position === 'in-right' || position === 'in-center'){
      this.excuteCommand(new MoveInCommand(draggedNode, targetNode));
      return true;        
    }
    if(position === 'in-top' || position === 'in-left'){
      this.excuteCommand(new MoveInTopCommand(draggedNode, targetNode));
      return true;  
    }
    if(position === 'out-bottom' || position === 'out-right'){
      this.excuteCommand(new MoveAfterCommand(draggedNode, targetNode));
      return true;  
    }
    if(position === 'out-top' || position === 'out-left'){
      this.excuteCommand(new MoveBeforeCommand(draggedNode, targetNode));
      return true;  
    }
    return false;  
  }

}
