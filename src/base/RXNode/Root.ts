import IMenuItem from "base/IMenuItem";
import { RXNode } from "./RXNode";

export class RXNodeRoot<T> extends RXNode<T>{
  children = new Array<RXNode<T>>();

  parse(metas?:Array<T>){
    metas && metas.forEach((meta: any)=>{
      let node = RXNode.make<T>(meta);
      node.parent = this;
      this.children.push(node);
    })
  }

  getNode(id:number|undefined){
    if(!id){
      return undefined;
    }

    for(var i = 0; i < this.children.length; i ++){
      const child = this.children[i];
      let childOfChild = child.getNode(id);
      if(childOfChild){
        return childOfChild
      }
    }
    return undefined
  }

  copy(){
    let copy = new RXNodeRoot<T>()
    this.children.forEach(child=>{
      let childCopy = child.copy();
      childCopy.parent = copy;
      copy.children.push(childCopy);
    })
    return copy;
  }

  getRootMetas(){
    let metas:Array<IMenuItem> = [];
    this.children.forEach(child=>{
      metas.push(child.getMeta());
    })

    return metas;
  }

}