import { FieldType } from "base/FieldType";
import { IMeta } from "base/Model/IMeta";
import { IPage } from "base/Model/IPage";
import { resolveFieldType } from "base/RxDrag";
import { RXNodeRoot } from "base/RXNode/Root";
import { RXNode } from "base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { cloneObject } from "utils/cloneObject";
import { FieldStore, IFieldStore } from "./FieldStore";
import { TableFieldStore } from "./TableFieldStore";
import { ModelArrayFieldStore } from "./ModelArrayFieldStore";
import { ModelFieldStore } from "./ModelFieldStore";
import { IModelStore } from "./IModelStore";
import { SelectFieldStore } from "./SelectFieldStore";
import { MediaFieldStore } from "./MediaFieldStore";
import { IModelNode } from "./IModelNode";

function parseFieldFromNode(modelStore:IModelStore, node: RXNode<IMeta>){
  const fieldName = node.meta.props?.field;
  let nextParentStore:IModelStore = modelStore;
  if(fieldName){
    let fieldType = resolveFieldType(node.meta.name);
    let fieldStore: any = new FieldStore(node.meta);
    if(fieldType === FieldType.Select){
      fieldStore = new SelectFieldStore(node.meta);
    }
    if(fieldType === FieldType.Media){
      fieldStore = new MediaFieldStore(node.meta);
    }
    if(fieldType === FieldType.Model){
      fieldStore = new ModelFieldStore(node.meta);
      nextParentStore = fieldStore;
    }
    if(fieldType === FieldType.ModelArray){
      fieldStore = new ModelArrayFieldStore(node.meta);
      nextParentStore = fieldStore;
    }
    if(fieldType === FieldType.Table){
      fieldStore = new TableFieldStore(node.meta);
      nextParentStore = fieldStore;
    }
    modelStore.setFieldStore(fieldName, fieldStore);
  }
  
  node.children?.forEach(child=>{
    parseFieldFromNode(nextParentStore ,child);
  })
}

export class ModelStore implements IModelStore , IModelNode{
  model?: any;
  loading?: boolean;
  fields: Map<string,IFieldStore>;
  pageLayout?:Array<RXNode<IMeta>>;
  constructor() {
    makeAutoObservable(this)
    this.fields = new Map<string,IFieldStore>();
  }

  setFieldStore(fieldName:string, fieldStore:IFieldStore){
    this.fields.set(fieldName, fieldStore)
  }

  getFieldStore(fieldName:string){
    return this.fields.get(fieldName)
  }

  clearDirty(){
    this.fields.forEach(fieldStore=>{
      fieldStore.clearDirty();
    })
  }

  isDirty(){
    let dirty = false;
    this.fields.forEach(fieldStore=>{
      if(fieldStore.isDirty()){
        dirty = true;
      }
    })
    return dirty;
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  parsePage(page?:IPage){
    const layout = page?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));
    this.pageLayout = root.children;

    this.pageLayout?.forEach(node=>{
      parseFieldFromNode(this, node);
    })
  }

  setModel(model:any){
    this.model = model
    console.log('setModel', model)
    this.fields.forEach(fieldStore=>{
      fieldStore.setModel(model);
    })
  }

  toFieldsGQL(){
    let gql = ' id '
    this.fields.forEach(fieldStore=>{
      gql = gql + ` ${fieldStore.toFieldsGQL()} `
    })
    return gql;
  }

  //目前只处理根节点
  getModelNode(name?:string):IModelNode|undefined{
    if(!name){
      return this;
    }
    let node = undefined;
    this.fields.forEach((fieldStore,key)=>{
      if(key === name){
        node = fieldStore;
      }
    })
    return node;
  }

  toInputValue(){
    let rtValue = this.model?.id ? {id:this.model?.id} as any : {} as any;
    this.fields?.forEach((fieldStore, key)=>{
      if(!fieldStore.meta.props?.onlyShow){
        rtValue[key] = fieldStore.toInputValue();        
      }
    })

    return rtValue
  }

  validate():boolean{
    let passed = true;
    this.fields?.forEach((fieldStore, key)=>{
      if(!fieldStore.validate()){
        passed = false;
      }
    })
    return passed;
  }

  reset(){
    this.fields?.forEach((fieldStore, key)=>{
      fieldStore.reset()
    })
  }
}