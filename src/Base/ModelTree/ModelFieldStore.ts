import { makeAutoObservable, toJS } from "mobx";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";
import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";


export class ModelFieldStore implements IFieldStore{
  id:ID;
  defaultValue?: any;
  value?: any;
  error?: string;
  node?: RXNode<IMeta>;
  loading?: boolean;
  isSelected?: boolean;
  subFields: Map<string,IFieldStore>;
  constructor(node?: RXNode<IMeta>) {
    this.id = creatId();
    this.node = node;
    this.subFields = new Map<string,IFieldStore>();
    makeAutoObservable(this);
  }

  setFieldStore(fieldName: string, fieldStore: IFieldStore) {
    this.subFields.set(fieldName, fieldStore);
  }

  getFieldStore(fieldName?:string){
    if(!fieldName){
      return undefined;
    }
    return this.subFields.get(fieldName)
  }

  removeFieldStore(fieldName:string){
    this.subFields.delete(fieldName);
  }

  clearDirty(){
    this.subFields?.forEach((fieldStore, key)=>{
      fieldStore.clearDirty();
    })
  }

  isDirty(){
    let dirty = false;
    this.subFields?.forEach((fieldStore, key)=>{
      if(fieldStore.isDirty()){
        dirty = true;
      }
    })

    return dirty;
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  setValue(value: any) {
    this.subFields.forEach(fieldStore=>{
      fieldStore.setModel(value);
    })
  }

  setModel(model: any) {
    const fieldName = this.node?.meta.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.subFields.forEach(fieldStore=>{
      fieldStore.setModel(fieldValue);
    })
  }

  toFieldsGQL() {
    let subGql = '';
    this.subFields.forEach(fieldStore=>{
      subGql = subGql + ` ${fieldStore.toFieldsGQL()} `
    })
    return subGql ? ` ${this.node?.meta.field}{id ${subGql}}` :  ` ${this.node?.meta.field} `;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined
  }

  toInputValue(){
    let rtValue = this.defaultValue?.id ? {id:this.defaultValue?.id} as any : {} as any;
    this.subFields?.forEach((fieldStore, key)=>{
      if(!fieldStore.node?.meta.onlyShow){
        rtValue[key] = fieldStore.toInputValue();
      }
    })
    return rtValue;
  }

  updateDefaultValue(){
    this.defaultValue = toJS(this.value);
    this.subFields?.forEach((fieldStore, key)=>{
      fieldStore.updateDefaultValue();
    })
  }

  validate(){
    let passed = true;
    this.subFields?.forEach((fieldStore, key)=>{
      if(!fieldStore.validate()){
        passed = false;
      }
    })
    return passed;
  }

  reset(){
    this.subFields?.forEach((fieldStore, key)=>{
      fieldStore.reset()
    })
  }

  getChildren(){
    let children:Array<IModelNode> = [];
    this.subFields.forEach(fieldStore=>{
      children.push(fieldStore);
    })

    return children;
  }

  getLabel(){
    return `Submodel : ${this.node?.meta.field}`
  }

  setSelected(selected:boolean){
    this.isSelected = selected;
  }
}
