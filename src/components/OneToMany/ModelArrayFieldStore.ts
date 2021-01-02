import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IModelStore } from "../../base/ModelTree/IModelStore";
import { IFieldStore } from "../../base/ModelTree/FieldStore";
import { IModelNode } from "../../base/ModelTree/IModelNode";
import { ModelFieldStore } from "base/ModelTree/ModelFieldStore";
import { creatId } from "base/creatId";


export class ModelArrayFieldStore implements IFieldStore, IModelStore {
  id:number;
  defaultValue?: any;
  value?: any;
  error?: string;
  meta: IMeta;
  loading?: boolean;
  dirty?: boolean;
  rows:Array<ModelFieldStore> = [];
  schemaRow?:ModelFieldStore;
  constructor(meta: IMeta) {
    this.id = creatId();
    this.meta = meta;
    this.schemaRow = new ModelFieldStore(this.meta);
    makeAutoObservable(this);
  }
  setFieldStore(fieldName: string, fieldStore: IFieldStore) {
  }

  getFieldStore(fieldName:string){
    return undefined;
  }

  clearDirty(){
    //this.dirty = false;
  }

  isDirty(){
    return false;
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

  addRow(){

  }

  removeRow(){

  }
}
