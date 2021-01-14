import { IMeta } from "Base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IFieldStore } from "../../Base/ModelTree/FieldStore";
import { IModelNode } from "../../Base/ModelTree/IModelNode";
import { ModelFieldStore } from "Base/ModelTree/ModelFieldStore";
import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";


export class ModelArrayFieldStore implements IFieldStore {
  id:ID;
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

  setLoading(loading?:boolean){
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

  getChildren(){
    return [];
  }

  getLabel(){
    return 'Table:' + this.meta?.props?.field
  }

  removeFieldStore(fieldName:string){  
  }
}
