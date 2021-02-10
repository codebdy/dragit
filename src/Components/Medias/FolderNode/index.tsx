import { makeAutoObservable } from 'mobx';
import { ID } from 'rx-drag/models/baseTypes';


export class FolderNode{
  id: ID;
  name: string;
  children: Array<FolderNode> = [];
  parent?: FolderNode;
  editing: boolean = false;
  loading: boolean = false;

  constructor(id:ID, name:string, parent?:FolderNode) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    makeAutoObservable(this)
  }

  setChildren(children?: Array<FolderNode>){
    this.children = children||[];
  }

  addChild(folder:FolderNode){
    folder?.setParent(this);
    this.children?.push(folder);
  }

  setEditing(editing:boolean){
    this.editing = editing;
  }

  setName(name:string){
    this.name = name;
  }

  removeChild(folder:FolderNode){
    this.children?.splice(this.children.indexOf(folder), 1);
  }

  getRemoveIds(ids?:Array<ID>){
    let retIds = ids ? ids : [];
    retIds.push(this.id);
    this.children?.forEach(child=>{
      child.getRemoveIds(retIds)
    })
    return retIds;
  }

  moveTo(folder?:FolderNode){
    this.parent?.removeChild(this);
    this.parent = folder;
    folder?.addChild(this);
  }

  setLoading(loading:boolean){
    this.loading = loading;
  }

  setParent(parent?:FolderNode){
    this.parent = parent;
  }
}
