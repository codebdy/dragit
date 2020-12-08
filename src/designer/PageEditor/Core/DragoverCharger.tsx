import React from 'react';
import { IDragOverParam, IRect } from "./IDragOverParam";
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
}

export class DragoverCharger {
  node: RXNode<IMeta>;
  draggedMetas?: Array<IMeta>;
  constructor(node: RXNode<IMeta>, draggedMetas?: Array<IMeta>) {
    this.node = node;
    this.draggedMetas = draggedMetas;
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


  get dragOutRectTopArea() {
    const rect = this.node.rect;
    if (!rect) {
      return undefined;
    }
    return new Rect({
      ...rect,
      bottom: rect.top + this.dropInMargin,
    });
  }

  get dragOutRectRightArea() {
    const rect = this.node.rect;
    if (!rect) {
      return undefined;
    }
    return new Rect({
      ...rect,
      left: rect.right - this.dropInMargin,
    });
  }

  get dragOutRectBottomArea() {
    const rect = this.node.rect;
    if (!rect) {
      return undefined;
    }
    return new Rect({
      ...rect,
      top: rect.bottom - this.dropInMargin,
    });
  }

  get dragOutRectLeftArea() {
    const rect = this.node.rect;
    if (!rect) {
      return undefined;
    }

    return new Rect({
      ...rect,
      right: rect.left + this.dropInMargin,
    });
  }

  //判断一个节点是否接受被拖动的数据，不输入参数代表判断本节点
  isNodeAcceptMetas(node?: RXNode<IMeta>) {
    const metas = this.draggedMetas;
    let targetNodeName = node?.meta.name || this.node.meta.name;
    if (!targetNodeName || !metas) {
      return false;
    }
    const rule = resolveRule(targetNodeName);
    for (var i = 0; i < metas.length; i++) {
      if (!rule.accept(metas[i])) {
        return false;
      }
    }
    return true;
  }
  isDragIn(event: React.MouseEvent<HTMLElement>) {
    return this.dragInRect?.isIn(event) && this.isNodeAcceptMetas();
  }

  onBefore(event: React.MouseEvent<HTMLElement>) {
    if (this.isNodeAcceptMetas(this.node.parent)) {
      return this.dragOutRectTopArea?.isIn(event) || this.dragOutRectLeftArea?.isIn(event);
    }
    return false;
  }

  onAfter(event: React.MouseEvent<HTMLElement>) {
    if (this.isNodeAcceptMetas(this.node.parent)) {
      return this.dragOutRectBottomArea?.isIn(event) || this.dragOutRectRightArea?.isIn(event);
    }
    return false;
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
    if (!this.draggedMetas) {
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
      return{
        targetNode: this.node,
        position:"in-center",
      };
    }

    return {
      targetNode: this.node,
      position:"in-right",
    };
    //if(this.onBefore(event)){
    //  this.node.beforeBrother !== draggedNode && draggedNode.moveBefore(this.node);
    //  return;
    //}
    //if(this.onAfter(event)){
    //  this.node.afterBrother !== draggedNode && draggedNode.moveAfter(this.node);
    //  return;
    //}
  }

}
