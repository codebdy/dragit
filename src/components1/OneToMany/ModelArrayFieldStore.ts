import { IMeta } from "base1/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IModelStore } from "../../base1/ModelTree/IModelStore";
import { IFieldStore } from "../../base1/ModelTree/FieldStore";
import { IModelNode } from "../../base1/ModelTree/IModelNode";
import { ModelFieldStore } from "base1/ModelTree/ModelFieldStore";
import { creatId } from "base1/creatId";


export class ModelArrayFieldStore implements IFieldStore, IModelStore {
  id:number;
  defaultValue?: any;
  value?: any;
  error?: string;
  meta?: IMeta;
  loading?: boolean;
  dirty?: boolean;
  rows:Array<ModelFieldStore> = [];
  schemaRow?:ModelFieldStore;
  constructor(meta?: IMeta) {
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
    this.rows = [];
    model?.map((row:any)=>{
      const rowStore = new ModelFieldStore();
      rowStore.setValue(row);
      this.rows.push(rowStore);
    })
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
    this.rows.push(new ModelFieldStore(this.meta));
  }

  removeRow(index:number){
    this.rows.splice(index, 1);
  }
}
