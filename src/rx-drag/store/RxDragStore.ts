import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";
import { CursorPosition, IDragOverParam } from "rx-drag/core/IDragOverParam";
import { IToolboxItem } from "rx-drag/models/IToolboxItem";
import { makeAutoObservable, toJS } from "mobx";
import { cloneObject } from "rx-drag/utils/cloneObject";
import { ChangeMetaCommand } from "../commands/ChangeMetaCommand";
import { ClearCommand } from "../commands/ClearCommand";
import { MoveAfterCommand } from "../commands/MoveAfterCommand";
import { MoveBeforeCommand } from "../commands/MoveBeforeCommand";
import { MoveInCommand } from "../commands/MoveInCommand";
import { MoveInTopCommand } from "../commands/MoveInTopCommand";
import { ICommand } from "rx-drag/commands/ICommand";
import { IRxMeta } from "rx-drag/models/IRxMeta";

function makeCanvas(){
  return RxNode.make<IMeta>(
    {
      name:'Canvas',
      props:{
        
      }
    }
  )
}

export class RxDragStore{
  metas?:Array<IRxMeta>;
  showOutline:boolean = true;
  showPaddingX:boolean = true;
  showPaddingY:boolean = true;

  activeNode?: RxNode<IMeta>;
  dragOverParam?: IDragOverParam;
  draggedNode?: RxNode<IMeta>;
  canvas?: RxNode<IMeta>;
  draggedToolboxItem?: IToolboxItem;
  selectedNode?: RxNode<IMeta>;
  selectedDom: Element|null = null;
  undoList: Array<ICommand> = [];
  redoList: Array<ICommand> = [];

  refreshToolbarAndLabelFlag:number = 0;

  valueChangeFn?:(metas : Array<IRxMeta>)=>void;

  constructor() {    
    makeAutoObservable(this);
  }

  setValueChangeFn(valueChangeFn?:(metas : Array<IRxMeta>)=>void){
    this.valueChangeFn = valueChangeFn;
  }

  private parsePage(){
    this.canvas = makeCanvas();
    this.canvas.parse(this.metas);
  }

  setMetas(metas?:Array<IRxMeta>){
    this.metas = metas;
    this.parsePage();
    this.undoList = [];
    this.redoList = [];
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

  setActiveNode(activeNode?:RxNode<IMeta>){
    this.activeNode = activeNode;
  }

  setDragOverParam(dragOverParam?:IDragOverParam){
    this.dragOverParam = dragOverParam;
  }

  setDraggedNode(draggedNode?:RxNode<IMeta>){
    this.draggedNode = draggedNode;
  }

  setDraggedToolboxItem(draggedToolboxItem?:IToolboxItem){
    this.draggedToolboxItem = draggedToolboxItem;
  }

  setSelectedNode(selectedNode?:RxNode<IMeta>){
    if(selectedNode?.id === this.canvas?.id){
      this.selectedNode = undefined
    }
    else{
      this.selectedNode = selectedNode
    }

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

  refreshToolbarAndLabel(){
    this.refreshToolbarAndLabelFlag ++;
    //防止溢出
    if(this.refreshToolbarAndLabelFlag > 1000000){
      this.refreshToolbarAndLabelFlag = 0;
    }
  }

  excuteCommand(command:ICommand){
    const selectedNode = command.excute();
    this.setSelectedNode(selectedNode);
    this.undoList.push(command);
    this.redoList = [];
    this.refreshToolbarAndLabel();
    this.valueChangeFn && this.valueChangeFn(this.canvas?.getChildrenMetas()||[]);
  }

  undo(){
    const cmd = this.undoList.pop();
    const selectedNode = cmd?.undo();
    if(cmd){
      this.redoList.push(cmd);
    }
    this.setSelectedNode(selectedNode);
    this.refreshToolbarAndLabel();
    this.valueChangeFn && this.valueChangeFn(this.canvas?.getChildrenMetas()||[]);
  }

  redo(){
    const cmd = this.redoList.pop();
    const selectedNode = cmd?.excute();
    if(cmd){
      this.undoList.push(cmd);
    }
    this.setSelectedNode(selectedNode);
    this.refreshToolbarAndLabel();
    this.valueChangeFn && this.valueChangeFn(this.canvas?.getChildrenMetas()||[]);
  }

  operateNode (draggedNode:RxNode<IMeta>, targetNode:RxNode<IMeta>, position:CursorPosition){
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

  updateSelecteMeta(field:string, value:any){
    const meta = cloneObject(toJS(this.selectedNode?.meta));
    if(meta && this.selectedNode){
      meta[field] =value;
      this.excuteCommand(new ChangeMetaCommand(this.selectedNode, meta));
    }
  }

}
