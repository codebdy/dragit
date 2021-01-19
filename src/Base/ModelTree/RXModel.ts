import { makeAutoObservable, toJS } from "mobx";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { validate } from "./validate";

export class RXModel{
  //从model中的取值索引
  modelKey:string|number;
  node: RXNode<IMeta>;
  modelLabel: string = '';
  defaultValue?: any;
  value?: any;
  error?: string;  
  loading?: boolean;
  isSelected?: boolean;
  childrenMap: Map<string,RXModel>;
  constructor(node: RXNode<IMeta>, modelKey:string|number) {
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

  removeFieldStore(fieldName:string){
    this.childrenMap.delete(fieldName);
  }

  clearDirty(){
    this.childrenMap?.forEach((fieldStore, key)=>{
      fieldStore.clearDirty();
    })
  }

  isDirty(){
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
    this.value = value;
    this.childrenMap.forEach(child=>{
      child.setModel(value);
    })
  }

  setModel(model: any) {
    let childValue = model ? model[this.modelKey] : undefined;
    if(this.modelKey==='root'){//如果是根节点
      childValue = model;
    }
    this.defaultValue = childValue;
    this.value = childValue;
    this.childrenMap.forEach(childStore=>{
      childStore.setModel(childValue);
    })
  }

  get label(){
    return this.modelLabel || this.node.meta?.field || this.value?.id
  }

  setLabel(label?:string){
    this.modelLabel = label || '';
  }


  toInputValue(){
    if(this.childrenMap.size === 0){
      return this.value;
    }

    let rtValue = this.defaultValue?.id ? {id:this.defaultValue?.id} as any : {} as any;
    this.childrenMap?.forEach((fieldStore, key)=>{
      if(!fieldStore.node?.meta.onlyShow){
        rtValue[key] = fieldStore.toInputValue();
      }
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
    this.childrenMap.clear();
  }

  setSelected(selected:boolean){
    this.isSelected = selected;
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
}
