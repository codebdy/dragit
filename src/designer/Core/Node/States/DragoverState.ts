import { State } from "./State";
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from "../../bus";
import { INode } from "../INode";

declare var window: {draggedNode:INode};

class Rect{
  rect: { left: number; right: number; top: number; bottom: number; };

  constructor(rect:{left:number, right:number, top:number, bottom:number}){
    this.rect = rect;
  }

  isIn(event:MouseEvent){
    return (
      this.rect.left  <= event.clientX &&  this.rect.right >= event.clientX &&
      this.rect.top  <= event.clientY &&  this.rect.bottom  >= event.clientY
    )
  }
}

export class DragoverState extends State{
  style = {
    outline:"solid #5d78ff 1px",
  };

  get dropInMargin(){
    let margin = this.node.rule.dropInMargin
    margin = margin ? margin : 0
    return margin;
  }

  //在此区域内，算是拖入
  get dragInRect(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }

    let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left + this.dropInMargin,
      right: rect.right - this.dropInMargin,
      top: rect.top + this.dropInMargin,
      bottom: rect.bottom - this.dropInMargin,
    })
  }


  get dragOutRectTopArea(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }
      let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.top + this.dropInMargin,
    })
  }

  get dragOutRectRightArea(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }
      let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.right - this.dropInMargin,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
    })
  }

  get dragOutRectBottomArea(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }
      let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left,
      right: rect.right,
      top: rect.bottom - this.dropInMargin,
      bottom: rect.bottom,
    })
  }
  
  get dragOutRectLeftArea(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }

    let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left,
      right: rect.left + this.dropInMargin,
      top: rect.top,
      bottom: rect.bottom,
    })
  }

  isDragIn(event:MouseEvent){
    let draggedNode = window.draggedNode;
    return this.dragInRect?.isIn(event) && this.node?.accept(draggedNode);
  }

  onBefore(event:MouseEvent){
    let draggedNode = window.draggedNode;
    if(this.node.parent?.accept(draggedNode)){
      return this.dragOutRectTopArea?.isIn(event) || this.dragOutRectLeftArea?.isIn(event);
    }
   return false; 
  }

  onAfter(event:MouseEvent){
    let draggedNode = window.draggedNode;
    if(this.node.parent?.accept(draggedNode)){
      return this.dragOutRectBottomArea?.isIn(event) || this.dragOutRectRightArea?.isIn(event);
    }
    return false;
  }
  
  handleMouseMove(event:MouseEvent){
    event.stopPropagation();
    let draggedNode = window.draggedNode 
    if(!draggedNode){
      return;
    }

    if(this.isDragIn(event)){
      const afterChild = this.node.firstChildAfterMouse(event)
      if(afterChild){
        draggedNode!== afterChild && afterChild.beforeBrother !== draggedNode && draggedNode.moveBefore(afterChild);
      }
      else{
        this.node.lastChild !== draggedNode && draggedNode.moveInBottom(this.node);
      }

      return;
    }

    if(this.onBefore(event)){
      this.node.beforeBrother !== draggedNode && draggedNode.moveBefore(this.node);
      return;
    }
    if(this.onAfter(event)){
      this.node.afterBrother !== draggedNode && draggedNode.moveAfter(this.node);
      return;
    }
  }

  handleMouseOut(event:MouseEvent){
    this.node.toNormalState();
  }

  enter(){
    //bus.emit(ACTIVE_NODE, this.node)
  }

  leave(){
    //bus.emit(UN_ACTIVE_NODE, this.node)
  }

}