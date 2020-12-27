import { IMeta } from "base/Model/IMeta";
import { IPage } from "base/Model/IPage";
import { IValidateRule } from "base/Model/IValidateRule";
import { hasChildField } from "base/RxDrag";
import { RXNodeRoot } from "base/RXNode/Root";
import { RXNode } from "base/RXNode/RXNode";
import { makeAutoObservable } from "mobx";
import { cloneObject } from "utils/cloneObject";

export class FieldStore{
  field?: string;
  defaultValue?: any;
  value?: any;
  error?: string;
  rule?: IValidateRule;
  subFields?: Map<string,FieldStore>;
  loading?: boolean;
  constructor(field:string) {
    makeAutoObservable(this);    
    this.field = field;
    if(hasChildField(field)){
      this.subFields = new Map<string,FieldStore>();
    }
  }

  toFieldsGQL(){
    let subGql = ''
    this.subFields?.forEach(fieldStore=>{
      subGql = subGql + ` ${fieldStore.toFieldsGQL()} `
    })
    return subGql ? ` ${this.field} { ${subGql} } ` : ` ${this.field} `;
  }
}

function parseFieldFromNode(fields:Map<string,FieldStore>, node: RXNode<IMeta>){
  const field = node.meta.field;
  let subFields = fields;
  if(field){
    let fieldStore = new FieldStore(field);
    if(fieldStore.subFields){
      subFields = fieldStore.subFields;
    }
    fields.set(field, fieldStore);
  }
  
  node.children?.forEach(child=>{
    parseFieldFromNode(subFields ,child);
  })
}

export class PageStore{
  loading?: boolean;
  fields: Map<string,FieldStore>;
  pageLayout?:Array<RXNode<IMeta>>;
  constructor() {
    makeAutoObservable(this)
    this.fields = new Map<string,FieldStore>();
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  parsePage(page?:IPage){
    const layout = page?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));
    this.pageLayout = root.children;

    this.pageLayout?.forEach(node=>{
      parseFieldFromNode(this.fields, node);
    })
  }

  setModel(model:any){
    
  }

  toFieldsGQL(){
    let gql = ''
    this.fields.forEach(fieldStore=>{
      gql = gql + ` ${fieldStore.toFieldsGQL()} `
    })
    return gql;
  }
}