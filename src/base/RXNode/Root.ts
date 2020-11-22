import { RXNode } from "./RXNode";

export class RXNodeRoot<T>{
  children = new Array<RXNode<T>>();

  parse(metas?:Array<T>){
    metas && metas.forEach((meta: any)=>{
      let node = RXNode.make<T>(meta);
      this.children.push(node);
    })
  }

  getMeta(id:number){
    for(var i = 0; i < this.children.length; i ++){
      const child = this.children[i];
      let childMeta = child.getMeta(id);
      if(childMeta){
        return childMeta
      }
    }
    return undefined
  }

  copy(){
    let copy = new RXNodeRoot<T>()
    this.children.forEach(child=>{
      copy.children.push(child.copy());
    })
    return copy;
  }

}