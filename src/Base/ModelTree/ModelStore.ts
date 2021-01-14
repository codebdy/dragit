import { ID } from "Base/Model/graphqlTypes";
import { makeAutoObservable } from "mobx";
import createId from "Utils/createId";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";

export class ModelStore implements IModelNode{
  id:ID;
  model?: any;
  loading?: boolean;
  fields: Map<string,IFieldStore>;

  constructor(model?:any) {
    this.id = createId();
    this.model = model;
    this.fields = new Map<string,IFieldStore>();    
    makeAutoObservable(this)
  }

  setFieldStore(fieldName:string, fieldStore:IFieldStore){
    this.fields.set(fieldName, fieldStore)
    fieldStore.setModel(this.model);
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
    this.fields.forEach(field=>{
      field.setLoading(loading);
    })
  }

  setFieldLoading(feildName:string, loading?:boolean){
    this.fields.get(feildName)?.setLoading(loading);
  }

  removeFieldStore(fieldName:string){  
    this.fields.delete(fieldName);
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
    return `{${gql}}`;
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
      if(!fieldStore.metaProps?.onlyShow){
        rtValue[key] = fieldStore.toInputValue();        
      }
    })

    return rtValue
  }

  updateDefaultValue(){
    this.fields?.forEach((fieldStore, key)=>{
      fieldStore.updateDefaultValue(); 
    })
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

  getChildren(){
    let children:Array<IModelNode> = [];
    this.fields.forEach(fieldStore=>{
      children.push(fieldStore);
    })

    return children;
  }

  getLabel(){
    return `Model:${this.model?.id}`
  }

}