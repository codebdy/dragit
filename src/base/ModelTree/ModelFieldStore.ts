import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable, toJS } from "mobx";
import { IModelStore } from "./IModelStore";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";
import { creatId } from "base/creatId";


export class ModelFieldStore implements IFieldStore, IModelStore {
  id:number;
  defaultValue?: any;
  value?: any;
  error?: string;
  meta?: IMeta;
  loading?: boolean;
  subFields: Map<string,IFieldStore>;
  constructor(meta?: IMeta) {
    this.id = creatId();
    this.meta = meta;
    this.subFields = new Map<string,IFieldStore>();
    makeAutoObservable(this);
  }

  setFieldStore(fieldName: string, fieldStore: IFieldStore) {
    this.subFields.set(fieldName, fieldStore);
  }

  getFieldStore(fieldName:string){
    return this.subFields.get(fieldName)
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

  setLoading(loading:boolean){
    this.loading = loading;
  }

  setValue(value: any) {
    this.subFields.forEach(fieldStore=>{
      fieldStore.setModel(value);
    })
  }

  setModel(model: any) {
    const fieldName = this.meta?.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.subFields.forEach(fieldStore=>{
      fieldStore.setModel(fieldValue);
    })
  }

  toFieldsGQL() {
    let subGql = '';
    this.subFields.forEach(fieldStore=>{
      subGql = subGql + ` ${fieldStore.meta?.props?.field} ${fieldStore.toFieldsGQL()} `
    })

    return subGql ? ` {id ${subGql}}` :  `  `;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined
  }

  toInputValue(){
    let rtValue = this.defaultValue?.id ? {id:this.defaultValue?.id} as any : {} as any;
    this.subFields?.forEach((fieldStore, key)=>{
      if(!fieldStore.meta?.props?.onlyShow){
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
}
