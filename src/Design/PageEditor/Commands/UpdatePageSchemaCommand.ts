import { cloneObject } from "Utils/cloneObject";
import { ICommand } from "./ICommand";
import { IPageUpdate } from "./IPageUpdate";

export class UpdatePageSchemaCommand implements ICommand{
  pageUpdate:IPageUpdate;
  key:string;
  oldValue?:string|Array<string>;
  value?:string|Array<string>;

  constructor(pageUpdate:IPageUpdate, key:'query'|'auths', value?:string|Array<string>){
    this.pageUpdate = pageUpdate;
    this.key = key;
    this.value = cloneObject(value);
    this.oldValue = pageUpdate.page?.schema ? pageUpdate.page.schema[key] : undefined;
  }

  excute(){
    if(this.pageUpdate.page){
      this.pageUpdate.setPage({...this.pageUpdate.page, schema:{...this.pageUpdate.page.schema, [this.key]:this.value}})
    }
    return this.pageUpdate.selectedNode;
  }

  undo(){
    if(this.pageUpdate.page){
      this.pageUpdate.setPage({...this.pageUpdate.page, schema:{...this.pageUpdate.page.schema, [this.key]:this.oldValue}})
    }
    return this.pageUpdate.selectedNode;
  }
}