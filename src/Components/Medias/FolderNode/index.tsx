import { makeAutoObservable } from 'mobx';
import { ID } from 'rx-drag/models/baseTypes';


export class FolderNode{
  id: ID;
  name: string;
  children?: Array<FolderNode>;
  parent?: FolderNode;
  editing: boolean = false;

  constructor(id:ID, name:string, parent?:FolderNode) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    makeAutoObservable(this)
  }

  setChildren(children?: Array<FolderNode>){
    this.children = children;
  }

  addChild(folder:FolderNode){
    this.children?.push(folder);
  }

  setEditing(editing:boolean){
    this.editing = editing;
  }

  setName(name:string){
    this.name = name;
  }
}
