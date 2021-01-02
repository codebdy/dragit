import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IModelStore } from "./IModelStore";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";


export class TableFieldStore implements IFieldStore, IModelStore {
  defaultValue?: any;
  value?: any;
  error?: string;
  meta: IMeta;
  loading?: boolean;
  constructor(meta: IMeta) {
    this.meta = meta;
    makeAutoObservable(this);
  }

  clearDirty(){
  }

  isDirty(){
    return false;
  }

  setFieldStore(fieldName: string, fieldStore: IFieldStore) {
  }

  getFieldStore(fieldName:string){
    return undefined;
  }
  
  setLoading(loading:boolean){
    this.loading = loading;
  }
  
  setValue(value: any) {
  }

  setModel(model: any) {
  }

  toFieldsGQL() {
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined;
  }

  toInputValue(){
  }
  updateDefaultValue(){
  }

  validate(){
    return true;
  }

  reset(){
    this.value = this.defaultValue
    this.error = undefined;
  }
}
