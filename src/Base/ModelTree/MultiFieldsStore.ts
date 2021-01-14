import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { makeAutoObservable, toJS } from "mobx";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";
import { validate } from "./validate";

//解析JXS的控件使用，可以内部使用多个字段名
export class MultiFieldsStore implements IModelNode{
  id:ID;
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  dirty?: boolean;
  constructor(meta:IMeta) {
    this.id = creatId();
    makeAutoObservable(this);
    this.meta = meta;
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  clearDirty(){
    this.dirty = false;
  }

  isDirty(){
    return this.dirty;
  }
  
  toFieldsGQL() {
    return ` ${this.meta.graphiQL} `;
  }

  setModel(model: any) {
    const fieldName = this.meta.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.value = fieldValue;
  }

  setValue(value: any) {
    this.value = value;
    this.dirty = true;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined;
  }

  toInputValue(){
    return toJS(this.value);
  }

  updateDefaultValue(){
    this.defaultValue = toJS(this.value);
  }

  validate(){
    this.error = validate(this.value, this.meta?.props?.rule);
    return !this.error;
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


