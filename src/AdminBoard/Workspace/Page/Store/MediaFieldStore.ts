import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IFieldStore } from "./FieldStore";
import { IModelNode } from "./IModelNode";
export class MediaFieldStore implements IFieldStore{
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  
  constructor(meta:IMeta) {
    makeAutoObservable(this);
    this.meta = meta;
  }
  setModel(model: any) {
    const fieldName = this.meta.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.value = fieldValue;
  }

  setValue(value: any) {
    this.value = value;
  }


  toFieldsGQL() {
    return ` ${this.meta?.props?.field} {id thumbnail title alt src} `;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined;
  }

  valueToInput(value:any){
    if(value){
      return {id:value.id, thumbnail:value.thumbnail, alt:value.alt};
    }
  }

  toInputValue(){
    if(this.value && this.value instanceof Array){
      return this.value.map((item,key)=>{
        return this.valueToInput(item);
      })
    }
    return this.valueToInput(this.value);
  }

  validate(){
    return true;
  }
}


