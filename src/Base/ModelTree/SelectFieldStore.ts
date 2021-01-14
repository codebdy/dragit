import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { makeAutoObservable, toJS } from "mobx";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";
export class SelectFieldStore implements IFieldStore{
  id:ID;
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  dirty?:boolean;
  
  constructor(meta:IMeta) {
    this.id = creatId();
    makeAutoObservable(this);
    this.meta = meta;
  }
  setModel(model: any) {
    const fieldName = this.meta.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.value = fieldValue;
  }

  clearDirty(){
    this.dirty = false;
  }

  isDirty(){
    return this.dirty;
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }
  
  setValue(value: any) {
    this.value = value;
    this.dirty = true;
  }

  getItemKey(){
    let itemKey = this.meta.props?.itemKey;
    itemKey = this.meta.props?.query ? itemKey : 'slug';
    return itemKey ? itemKey : 'id';
  }

  toFieldsGQL() {
    return ` {${this.getItemKey()}} `;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined;
  }

  toInputValue(){
    const itemKey = this.getItemKey();
    this.value?.forEach((item:any,key:any)=>{
      this.value[key] = {[itemKey]:item[itemKey]}
    })
    return this.value;
  }

  updateDefaultValue(){
    this.defaultValue = toJS(this.value);
  }

  validate(){
    return true;
  }

  reset(){
    this.value = this.defaultValue
    this.error = undefined;
  }

  getChildren(){
    return [];
  }

  setFieldStore(fieldName:string, fieldStore:IFieldStore){

  }

  getFieldStore(fieldName:string){
    return undefined;
  }
}


