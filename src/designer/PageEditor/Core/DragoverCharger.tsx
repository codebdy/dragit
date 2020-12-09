import React from 'react';
import { CursorPosition, IDragOverParam } from "./IDragOverParam";
import { IRect } from "../../../base/Model/IRect";
import { resolveRule } from 'base/DragRX';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';

class Rect {
  rect: IRect;

  constructor(rect: IRect) {
    this.rect = rect;
  }

  isIn(event?: React.MouseEvent<HTMLElement>) {
    if (!event) {
      return false;
    }

    return (
      this.rect.left <= event.clientX && this.rect.right >= event.clientX &&
      this.rect.top <= event.clientY && this.rect.bottom >= event.clientY
    );
  }

  isOnLeft(event?: React.MouseEvent<HTMLElement>) {
    if (!event) {
      return false;
    }

    return this.rect.left > event.clientX ;
  }

  isOnRight(event?: React.MouseEvent<HTMLElement>) {
    if (!event) {
      return false;
    }

    return this.rect.right < event.clientX ;
  }

  isOnTop(event?: React.MouseEvent<HTMLElement>) {
    if (!event) {
      return false;
    }

    return this.rect.top > event.clientY ;
  }

  isOnBottom(event?: React.MouseEvent<HTMLElement>) {
    if (!event) {
      return false;
    }

    return this.rect.bottom < event.clientY ;
  }

  atPosition(event: React.MouseEvent<HTMLElement>|undefined, prefix:'in'|'out'):CursorPosition{
    if (!event || !this.isIn(event)) {
      return undefined;
    }
    
    let xRatio = (event.clientX - this.rect.x)/(this.rect.x + this.rect.width - event.clientX) 
    let yRatio = (event.clientY - this.rect.y)/(this.rect.y + this.rect.height - event.clientY)
    
    //左半部分
    if(xRatio <= 1){
      //上方
      if(yRatio <=1){
        if(xRatio < yRatio  ){
          return `${prefix}-left` as any;
        }  
        return `${prefix}-top` as any;      
      }//下方
      else{
        if(xRatio < 1/yRatio  ){
          return `${prefix}-left` as any;
        }  
        return `${prefix}-bottom` as any;   
      }
    }//右半部分
    else{
      //上方
      if(yRatio <=1){
        if(1/xRatio < yRatio  ){
          return `${prefix}-right` as any;
        }  
        return `${prefix}-top` as any;      
      }//下方
      else{
        if(1/xRatio < 1/yRatio  ){
          return `${prefix}-right` as any;
        }  
        return `${prefix}-bottom` as any;   
      }
    }
  }
}

export class DragoverCharger {
  node: RXNode<IMeta>;
  draggedMeta?: IMeta;
  constructor(node: RXNode<IMeta>, draggedMeta?: IMeta) {
    this.node = node;
    this.draggedMeta = draggedMeta;
  }

  get dropInMargin() {
    let nodeName = this.node?.meta.name;
    if (!nodeName) {
      return 0;
    }
    const rule = resolveRule(nodeName);
    let margin = rule.dropInMargin;
    margin = margin ? margin : 0;
    return margin;
  }

  //在此区域内，算是拖入
  get dragInRect() {
    const rect = this.node.rect;
    if (!rect) {
      return undefined;
    }
    return new Rect({
      ...rect,
      left: rect.left + this.dropInMargin,
      right: rect.right - this.dropInMargin,
      top: rect.top + this.dropInMargin,
      bottom: rect.bottom - this.dropInMargin,
    });
  }

  get rect(){
    const rect = this.node.rect;
    if (!rect) {
      return undefined;
    }
    return  new Rect(rect);
  }

  //判断一个节点是否接受被拖动的数据，不输入参数代表判断本节点
  isNodeAcceptMeta(node?: RXNode<IMeta>, meta?:IMeta) {
    const childMeta = meta || this.draggedMeta;
    let targetNodeName = node?.meta.name || this.node.meta.name;
    if (!targetNodeName || !childMeta) {
      return false;
    }
    const rule = resolveRule(targetNodeName);
    return rule.accept(childMeta);
  }

  isDragIn(event: React.MouseEvent<HTMLElement>) {
    return this.dragInRect?.isIn(event) && this.isNodeAcceptMeta();
  }

  firstChildAfterMouse(event: React.MouseEvent<HTMLElement>, node?: RXNode<IMeta>) {
    let theNode = node || this.node;
    if (!theNode) {
      return;
    }
    for (let child of theNode.children) {
      if (this.isAfterMouse(event, child)) {
        return child;
      }
    }

    return undefined;
  }

  isAfterMouse(event: React.MouseEvent<HTMLElement>, node?: RXNode<IMeta>): boolean {
    let theNode = node || this.node;
    if (!theNode) {
      return false;
    }

    const { clientX, clientY } = event;

    let rect = theNode.rect;
    if (!rect) {
      return false;
    }

    if (rect.left >= clientX) {
      return true;
    }

    if (rect.top >= clientY) {
      return true;
    }

    return false;
  }

  judgePosition(event: React.MouseEvent<HTMLElement>): IDragOverParam{
    event.stopPropagation();
    if (!this.draggedMeta) {
      return{};
    }

    if (this.isDragIn(event)) {
      const afterChild = this.firstChildAfterMouse(event);
      let bother = afterChild?.beforeBrother() || afterChild;
      
      if(bother){
        if(bother.rect){
          let rect = new Rect(bother.rect)
          if(rect.isOnLeft(event)){
            return{
              targetNode:bother,
              position:"out-left",
            }
          }

          if(rect.isOnRight(event)){
            return{
              targetNode:bother,
              position:"out-right",
            }
          }

          if(rect.isOnTop(event)){
            return{
              targetNode:bother,
              position:"out-top",
            }
          }

          if(rect.isOnBottom(event)){
            return{
              targetNode:bother,
              position:"out-bottom",
            }
          }
        }
      }
      if(this.node.children?.length > 0){
        return{
          targetNode: this.node,
          position:this.dragInRect?.atPosition(event, 'in'),
        };
      }
      return{
        targetNode: this.node,
        position:"in-center",
      };
    }
    else{
      if(!this.node.parent){
        return {};
      }
      if(!this.isNodeAcceptMeta(this.node.parent)){
        return {};
      }
      return{
        targetNode: this.node,
        position:this.rect?.atPosition(event, 'out'),
      };      
    }
  }

}
