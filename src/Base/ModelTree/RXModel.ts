import { makeAutoObservable, toJS } from "mobx";
import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/models/RxNode";
import { validate } from "./validate";
import { createId } from "Base/creatId";
import { ID } from "rx-drag/models/baseTypes";

export class RXModel{
  id:ID;
  //从model中的取值索引
  modelKey:string|number;
  node: RxNode<IMeta>;
  modelLabel: string = '';
  defaultValue?: any;
  value?: any;
  error?: string;  
  loading?: boolean;
  childrenMap: Map<string,RXModel>;
  isTable?:boolean;

  private _isDirty:boolean = false;
  constructor(node: RxNode<IMeta>, modelKey:string|number) {
    this.id = createId();
    this.node = node;
    this.modelKey = modelKey;
    this.childrenMap = new Map<string,RXModel>();
    makeAutoObservable(this);
  }

  setChild(key: string, rxModel: RXModel) {
    this.childrenMap.set(key, rxModel);
  }

  getChild(key?:string){
    if(!key){
      return undefined;
    }
    return this.childrenMap.get(key)
  }

  removeChildStore(key:string){
    this.childrenMap.delete(key);
  }

  clearDirty(){
    this._isDirty = false;
    this.childrenMap?.forEach((fieldStore, key)=>{
      fieldStore.clearDirty();
    })
  }

  isDirty(){
    if(this._isDirty){
      return true;
    }
    let dirty = false;
    this.childrenMap?.forEach((fieldStore, key)=>{
      if(fieldStore.isDirty()){
        dirty = true;
      }
    })

    return dirty;
  }

  setLoading(loading?:boolean){
    this.loading = loading;
    this.childrenMap.forEach(child=>{
      child.setLoading(loading);
    })
  }

  setChildLoading(childKey:string,loading?:boolean){
    this.childrenMap.forEach((child,key)=>{
      if(childKey === key){
        child.setLoading(loading);        
      }
    })
  }

  setValue(value: any) {
    this._isDirty = true;
    this.value = value;
    this.childrenMap.forEach(child=>{
      child.initWithModel(value);
    })
  }

  initWithModel(model: any) {
    let childValue = model ? model[this.modelKey] : undefined;
    if(this.modelKey==='root'){//如果是根节点
      childValue = model;
    }
    this.defaultValue = childValue;
    this.value = childValue;
    this.childrenMap.forEach(childStore=>{
      childStore.initWithModel(childValue);
    })
  }

  get label(){
    return this.modelLabel || this.node.meta?.field || this.value?.id
  }

  setLabel(label?:string){
    this.modelLabel = label || '';
  }


  toInputValue(){
    if(this.node?.meta?.isSelect){
      const value = toJS(this.value);
      return Array.isArray(value)
        ? value.map(obj=>obj.id)
        : value?.id;
    }
    if(this.childrenMap.size === 0){
      return toJS(this.value);
    }
    if(this.isTable){
      return this.toTableInputValue();
    }
    else{
      return this.toModelInputValue();
    }
    
  }

  private toTableInputValue(){
    let rtValue:Array<any> = [];
    this.childrenMap?.forEach((fieldStore, key)=>{
      rtValue.push(fieldStore.toInputValue());
    })

    return rtValue;
  }

  private toModelInputValue(){
    let rtValue = this.defaultValue?.id ? {id:this.defaultValue?.id} as any : {} as any;
    this.childrenMap?.forEach((fieldStore, key)=>{
      rtValue[key] = fieldStore.toInputValue();
    })

    return rtValue;
  }

  updateDefaultValue(){
    this.defaultValue = toJS(this.value);
    this.childrenMap?.forEach((fieldStore, key)=>{
      fieldStore.updateDefaultValue();
    })
  }

  validate(){
    if(this.childrenMap.size === 0){
      this.error = validate(this.value, this.node?.meta.rule);
      return !this.error;
    }
    let passed = true;
    this.childrenMap?.forEach((fieldStore, key)=>{
      if(!fieldStore.validate()){
        passed = false;
      }
    })
    return passed;
  }

  reset(){
    this.value = this.defaultValue;
    this.childrenMap?.forEach((model, key)=>{
      model.reset()
    })
  }

  getChildren(){
    let children:Array<RXModel> = [];
    this.childrenMap.forEach(fieldStore=>{
      children.push(fieldStore);
    })

    return children;
  }

  clearChildren(){
    this._isDirty = false;
    this.childrenMap.clear();
  }


  //目前只处理根节点
  getModelNode(name?:string):RXModel|undefined{
    if(!name){
      return this;
    }
    let node = undefined;
    this.childrenMap.forEach((childModel,key)=>{
      if(key === name){
        node = childModel;
      }
    })
    return node;
  }

  setIsTable(isTable:boolean){
    this.isTable = isTable;
  }
}
