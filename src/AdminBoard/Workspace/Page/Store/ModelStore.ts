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
  id?: String;
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

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  setId(id?:String){
    this.id = id;
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

  getModelNode(name?:string):IModelNode|undefined{
    if(!name){
      return this;
    }

    return undefined;
  }

  toInputValue(){
    let rtValue = {id:this.id} as any;
    this.fields?.forEach((fieldStore, key)=>{
      rtValue[key] = fieldStore.toInputValue();
    })

    return rtValue
  }
}