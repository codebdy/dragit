import { IMeta } from "base/Model/IMeta";
import { IPage } from "base/Model/IPage";
import { IValidateRule } from "base/Model/IValidateRule";
import { RXNodeRoot } from "base/RXNode/Root";
import { RXNode } from "base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { cloneObject } from "utils/cloneObject";

export type FieldsMap = Map<string,FieldStore>;
export class FieldStore{
  field?:string;
  defaultValue?:any;
  value?:any;
  error?:string;
  rule?:IValidateRule;
  children?:FieldsMap|FieldsMap[];
  constructor() {
    makeAutoObservable(this)
  }
}

export class PageStore{
  loading?:boolean;
  fields?:FieldsMap;
  pageLayout?:Array<RXNode<IMeta>>;
  constructor() {
    makeAutoObservable(this)
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  parsePage(page?:IPage){
    const layout = page?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));
    this.pageLayout = root.children;
  }

  setModel(model:any){
    
  }

  toFieldsGQL(){
    return '';
  }
}