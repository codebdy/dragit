import { makeAutoObservable } from "mobx";
import { IFieldStore } from "../../Base/ModelTree/FieldStore";
import { IModelNode } from "../../Base/ModelTree/IModelNode";
import { ModelFieldStore } from "Base/ModelTree/ModelFieldStore";
import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";


export class ModelArrayFieldStore implements IFieldStore {
  id:ID;
  defaultValue?: any;
  value?: any;
  error?: string;
  node?: RXNode<IMeta>;
  loading?: boolean;
  isSelected?: boolean;
  dirty?: boolean;
  rows:Array<ModelFieldStore> = [];
  schemaRow?:ModelFieldStore;
  constructor(node?: RXNode<IMeta>) {
    this.id = creatId();
    this.node = node;
    this.schemaRow = new ModelFieldStore(this.node);
    makeAutoObservable(this);
  }
  setFieldStore(fieldName: string, fieldStore: IFieldStore) {
  }

  getFieldStore(fieldName?:string){
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
    this.rows.push(new ModelFieldStore(this.node));
  }

  removeRow(index:number){
    this.rows.splice(index, 1);
  }

  getChildren(){
    return [];
  }

  getLabel(){
    return 'Table:' + this.node?.meta.field
  }

  removeFieldStore(fieldName:string){  
  }

  setSelected(selected:boolean){
    this.isSelected = selected;
  }
}
