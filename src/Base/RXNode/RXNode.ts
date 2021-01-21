import { after, before, first, insertAfter, insertBefore, last, remove } from "Utils/ArrayHelper";
import { IRect } from "Base/Model/IRect";
import { cloneObject } from "Utils/cloneObject";
import { ID } from "Base/Model/graphqlTypes";
import { makeAutoObservable } from "mobx";
import { getDomByRxid } from "Utils/getDomByRxid";

export const DADA_RXID_CONST = "data-rxid"

export class RXNode<T>{
  static idSeed:number = 1;
  id: ID = '';  
  meta!: T;
  children: Array<RXNode<T>>;
  parent?:RXNode<T>;

  static make<T>(meta:T){
    let node = new RXNode<T>();
    node.seedId();      
    node.meta = meta;
    let metaAny = meta as any    
    const metaChildren = metaAny.children as Array<T>|undefined;
    node.children = [];
    metaChildren?.forEach(child=>{
      let childNode = RXNode.make<T>(child);
      childNode.parent = node;
      node.children.push(childNode);
    })

    //去掉Meta的Children，避免后期数据污染
    metaAny.children = undefined;
    return node;
  }

  constructor(){
    this.children = [];
    makeAutoObservable(this);
  }
  
  setMeta(meta:T){
    this.meta = meta;
  }

  setChildren(children:Array<RXNode<T>>|undefined){
    this.children = children || [];
  }

  seedId(){
    this.id = RXNode.idSeed.toString();
    RXNode.idSeed ++
  }

  get rxid(){
    return 'rx-' + this.id;
  }

  get rect():IRect|undefined{
    return this.dom?.getBoundingClientRect();
  }

  //完全复制包括ID的复制
  copy(){
    let copy = new RXNode<T>();
    copy.meta = cloneObject(this.meta);
    copy.id = this.id;
    copy.children = [];
    this.children.forEach(child=>{
      let childCopy = child.copy();
      childCopy.parent = copy;
      copy.children.push(childCopy);
    })

    return copy;
  }

  //复制一个副本，创建新ID，不插入父节点
  clone(){
    let metaCopy = cloneObject(this.getMeta());
    let newNode = RXNode.make<T>(metaCopy);
    return newNode;
  }

  duplicate(){
    const newNode = this.clone();
    newNode.parent = this.parent;
    newNode.moveAfter(this);
    return newNode;
  }

  getNode(id?:ID):RXNode<T>|undefined{
    if(id === this.id){
      return this;
    }
    for(var i = 0; i < this.children.length; i ++){
      const child = this.children[i];
      let childOfChild = child.getNode(id);
      if(childOfChild){
        return childOfChild
      }
    }

    return undefined;
  }

  get dom(){
    return getDomByRxid(this.rxid);
  }

  remove(){
    this.parent && remove(this, this.parent?.children);
    this.parent = undefined;
  }

  moveBefore(target:RXNode<T>){
    this.remove();
    insertBefore(this, target, target.parent?.children);
    this.parent = target.parent;
  }

  moveAfter(target:RXNode<T>){
    this.remove();
    insertAfter(this, target, target.parent?.children);
    this.parent = target.parent;
  }

  moveIn(target:RXNode<T>){
    this.remove();    
    target.children.push(this);
    this.parent = target;
  }

  moveInTop(target:RXNode<T>){
    this.remove();    
    target.children = [this, ...target.children];
    this.parent = target;
  }  

  firstChild(){
    return first(this.children);
  }

  lastChild(){
    return last(this.children);
  }

  previousSibling() : RXNode<T>|undefined{
    if(this.parent?.children){
      //避免[mobx] Out of bounds read， map转换一下
      return before(this, this.parent?.children.map(child=>child))
    }
  }

  nextSibling() : RXNode<T>|undefined{
    if(this.parent?.children){
      //避免[mobx] Out of bounds read， map转换一下
      return after(this, this.parent?.children.map(child=>child));      
    }
  }

   getMeta(){
    let metaAny = cloneObject(this.meta);
    metaAny.children = [];
    this.children.forEach(child=>{
      metaAny.children.push(child.getMeta());
    })

    return metaAny;
  }

  //判断是否是某个节点的祖先
  isAncestorOf(targetId:ID):boolean{
    if(!this.children){
      return false;
    }

    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].id === targetId){
        return true;
      }
      if(this.children[i].isAncestorOf(targetId)){
        return true;
      }
    }

    return false;
  }

  //判断是否是某个节点的后代
  isPosterityOf(targetId:ID):boolean{
    if(this.parent){
      if(this.parent.id === targetId){
        return true;
      }
      return this.parent.isPosterityOf(targetId)
    }
    return false;
  }

  exchangeTo(target:RXNode<T>){
    let targetMeta = target.meta;
    let targetChildren = target.children;
    let targetId = target.id;
    target.meta = this.meta;
    target.children = this.children;
    target.id = this.id;
    this.meta = targetMeta;
    this.children = targetChildren;
    this.id = targetId;
  }

  getChildrenMetas(){
    let metas:Array<T> = [];
    this.children.forEach(child=>{
      metas.push(child.getMeta());
    })

    return metas;
  }

  parse(metas?:Array<T>){
    this.children = [];
    metas && metas.forEach((meta: any)=>{
      let node = RXNode.make<T>(meta);
      node.parent = this;
      this.children.push(node);
    })
  }

} 