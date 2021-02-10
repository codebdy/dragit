import { IRxMedia } from "Base/Model/IRxMedia";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { ID } from "rx-drag/models/baseTypes";
import { FolderNode } from "./FolderNode";
import { getByIdFromTree } from "./FolderNode/getByIdFromTree";

export class MediasStore{
  draggedFolder?:FolderNode;
  draggedMedia?:IRxMedia;
  folders:Array<FolderNode> = [];
  selectedFolderId:ID = 0;
  gridLoading:boolean = false;
  medias:Array<IRxMedia> = [];
  selectedMedias:Array<IRxMedia> = [];
  pageNumber:number = 0;
  hasMore:boolean = true;

  constructor() {
    makeAutoObservable(this)
  }

  setFolders(folders : Array<FolderNode>){
    this.folders = folders;
  }

  addFolder(folder:FolderNode){
    this.folders.push(folder);
  }

  setSelectedFolderId(folderId:ID){
    this.selectedFolderId = folderId;
  }
  
  get selectedFolderNode(){
    return getByIdFromTree(this.selectedFolderId, this.folders);
  }
}

export const MediasStoreContext = createContext<MediasStore>({} as MediasStore);
export const MediasStoreProvider = MediasStoreContext.Provider;

export const useMediasStore = (): MediasStore => useContext(MediasStoreContext);