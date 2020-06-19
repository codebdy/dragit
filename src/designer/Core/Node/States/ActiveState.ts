import { State } from "./State";
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from "../../bus";
import { INode } from "../INode";

declare var window: {draggedNode:INode};
const positionMargin = 16;

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

export class ActiveState extends State{
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

  //拖入区域的顶部条形区域
  get dragInRectTopArea(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }

    let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left + this.dropInMargin,
      right: rect.right - this.dropInMargin,
      top: rect.top + this.dropInMargin,
      bottom: rect.top + this.dropInMargin + positionMargin,
    })
  }

  //拖入区域的左侧条形区域，子节点行布局时使用
  get dragInRectLeftArea(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }

    let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left + this.dropInMargin,
      right: rect.left + this.dropInMargin + positionMargin,
      top: rect.top + this.dropInMargin,
      bottom: rect.bottom - this.dropInMargin,
    })
  }

  get dragInRectLeftHalf(){
    let domElement = this.node.view?.getDom()
    if(!domElement){
      return undefined;
    }

    let rect = domElement.getBoundingClientRect() 
    return new Rect({
      left: rect.left + this.dropInMargin,
      right: rect.left + rect.width/2,
      top: rect.top + this.dropInMargin,
      bottom: rect.bottom - this.dropInMargin,
    })
  }

  inBottom(event:MouseEvent){
    let draggedNode = window.draggedNode;
    if(!this.node.accept(draggedNode)){
      return false;
    }

    //不在拖入区域
    if(!this.dragInRect?.isIn(event)){
      return false;
    }

    //没有子元素，则插入底部
    if(this.node.children.length === 0 ){
      return true;
    }

    //子元素行布局
    if(this.node.flexFlowRow()){
      return !this.dragInRectLeftHalf?.isIn(event);
    }

    //子元素列布局
    return !this.dragInRectTopArea?.isIn(event);
  }

  inTop(event:MouseEvent){
    let draggedNode = window.draggedNode;
    if(!this.node.accept(draggedNode)){
      return false;
    }
    //不在拖入区域
    if(!this.dragInRect?.isIn(event)){
      return false;
    }
    //在拖入区，但不在底部
    return !this.inBottom(event);
  }

  //拖入区域的顶部条形区域
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

    if(this.inBottom(event)){
      this.node.lastChild !== draggedNode && draggedNode.moveInBottom(this.node);
      return;
    }
    if(this.inTop(event)){
      this.node.firstChild !== draggedNode && draggedNode.moveInTop(this.node);
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
    bus.emit(ACTIVE_NODE, this.node)
  }

  leave(){
    bus.emit(UN_ACTIVE_NODE, this.node)
  }

}