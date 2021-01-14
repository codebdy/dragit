import { makeAutoObservable } from "mobx";
import { IFieldStore } from "../../Base/ModelTree/FieldStore";
import { IModelNode } from "../../Base/ModelTree/IModelNode";
import { ModelFieldStore } from "Base/ModelTree/ModelFieldStore";
import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";
import { IMetaProps } from "Base/Model/IMeta";


export class ModelArrayFieldStore implements IFieldStore {
  id:ID;
  defaultValue?: any;
  value?: any;
  error?: string;
  metaProps?: IMetaProps;
  loading?: boolean;
  isSelected?: boolean;
  dirty?: boolean;
  rows:Array<ModelFieldStore> = [];
  schemaRow?:ModelFieldStore;
  constructor(metaProps?: IMetaProps) {
    this.id = creatId();
    this.metaProps = metaProps;
    this.schemaRow = new ModelFieldStore(this.metaProps);
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
    this.rows.push(new ModelFieldStore(this.metaProps));
  }

  removeRow(index:number){
    this.rows.splice(index, 1);
  }

  getChildren(){
    return [];
  }

  getLabel(){
    return 'Table:' + this.metaProps?.field
  }

  removeFieldStore(fieldName:string){  
  }

  setSelected(selected:boolean){
    this.isSelected = selected;
  }
}
