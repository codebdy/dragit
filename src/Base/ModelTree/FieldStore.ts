import { creatId } from "Base/creatId";
import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { makeAutoObservable, toJS } from "mobx";
import { IModelNode } from "./IModelNode";
import { validate } from "./validate";

export interface IFieldStore extends IModelNode{
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;

  setValue: (value:any)=>void;
  setModel:(model: any)=>void;
  validate:()=>boolean;
}

export class FieldStore implements IFieldStore{
  id:ID;
  isSelected?:boolean;
  node:RXNode<IMeta>;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  dirty?: boolean;
  constructor(node:RXNode<IMeta>) {
    this.id = creatId();
    makeAutoObservable(this);
    this.node = node;
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

    const gqlStr = this.node?.meta.graphiQL ? this.node.meta.graphiQL.replace('$field', this.node?.meta.field||'') : this.node?.meta.field;
    return ` ${gqlStr} `;
  }

  setModel(model: any) {
    const fieldName = this.node?.meta.field;
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
    this.error = validate(this.value, this.node?.meta.rule);
    return !this.error;
  }

  reset(){
    this.value = this.defaultValue
    this.error = undefined;
  }

  getChildren(){
    return undefined;
  }

  setFieldStore(fieldName:string, fieldStore:IFieldStore){

  }

  getFieldStore(fieldName?:string){
    return undefined;
  }

  removeFieldStore(fieldName:string){  
  }

  getLabel(){
    return `Field : ${this.node?.meta.field}`;
  }

  setSelected(selected:boolean){
    this.isSelected = selected;
  }
}


