import { after, before, first, insertAfter, insertBefore, last, remove } from "rx-drag/utils/ArrayHelper";
import { IRect } from "rx-drag/models/IRect";
import { cloneObject } from "rx-drag/utils/cloneObject";
import { ID } from "rx-drag/models/baseTypes";
import { makeAutoObservable } from "mobx";
import { getDomByRxid } from "rx-drag/utils/getDomByRxid";

export const DADA_RXID_CONST = "data-rxid"

export class RxNode<T>{
  static idSeed:number = 1;
  id: ID = 0;  
  meta!: T;
  children: Array<RxNode<T>>;
  parent?:RxNode<T>;

  static make<T>(meta:T){
    let node = new RxNode<T>();
    node.seedId();      
    node.meta = meta;
    let metaAny = meta as any    
    const metaChildren = metaAny.children as Array<T>|undefined;
    node.children = [];
    metaChildren?.forEach(child=>{
      let childNode = RxNode.make<T>(child);
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

  setChildren(children:Array<RxNode<T>>|undefined){
    this.children = children || [];
  }

  seedId(){
    this.id = RxNode.idSeed;
    RxNode.idSeed ++
  }

  get rxid(){
    return 'rx-' + this.id;
  }

  get rect():IRect|undefined{
    return this.dom?.getBoundingClientRect();
  }

  //完全复制包括ID的复制
  copy(){
    let copy = new RxNode<T>();
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
    let newNode = RxNode.make<T>(metaCopy);
    return newNode;
  }

  duplicate(){
    const newNode = this.clone();
    newNode.parent = this.parent;
    newNode.moveAfter(this);
    return newNode;
  }

  getNode(id?:ID):RxNode<T>|undefined{
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

  moveBefore(target:RxNode<T>){
    this.remove();
    insertBefore(this, target, target.parent?.children);
    this.parent = target.parent;
  }

  moveAfter(target:RxNode<T>){
    this.remove();
    insertAfter(this, target, target.parent?.children);
    this.parent = target.parent;
  }

  moveIn(target:RxNode<T>){
    this.remove();    
    target.children.push(this);
    this.parent = target;
  }

  moveInTop(target:RxNode<T>){
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

  previousSibling() : RxNode<T>|undefined{
    if(this.parent?.children){
      //避免[mobx] Out of bounds read， map转换一下
      return before(this, this.parent?.children.map(child=>child))
    }
  }

  nextSibling() : RxNode<T>|undefined{
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

  exchangeTo(target:RxNode<T>){
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
      let node = RxNode.make<T>(meta);
      node.parent = this;
      this.children.push(node);
    })
  }

} 