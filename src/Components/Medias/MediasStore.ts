import { IRxMedia } from "Base/Model/IRxMedia";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { ID } from "rx-drag/models/baseTypes";
import { FolderNode } from "./FolderNode";
import { getByIdFromTree } from "./FolderNode/getByIdFromTree";
import { MediaStore } from "./MediaStore";
import { MediaUploadTask } from "./MediaUploadTask";

export class MediasStore{
  draggedFolder?:FolderNode;
  draggedMedia?:IRxMedia;
  folders:Array<FolderNode> = [];
  selectedFolderId:ID = 0;
  gridLoading:boolean = false;
  medias:Array<MediaStore> = [];
  tasks:Array<MediaUploadTask> = [];
  hasMorePages:boolean = true;
  currentPage:number = 0;
  singleSelective?:boolean = false;

  constructor(single?:boolean) {
    this.singleSelective = single;
    makeAutoObservable(this)
  }

  setFolders(folders : Array<FolderNode>){
    this.folders = folders;
  }

  addFolder(folder:FolderNode){
    this.folders.push(folder);
  }

  selectFolder(folderId:ID){
    this.selectedFolderId = folderId;
    if(folderId !== this.selectedFolderId){
      this.tasks = [];
    }
    this.hasMorePages = true;
  }
  
  get selectedFolderNode(){
    return getByIdFromTree(this.selectedFolderId, this.folders);
  }

  removeFolder(folder:FolderNode){
    this.folders?.splice(this.folders.indexOf(folder), 1);
  }

  setDraggedFolder(folder?:FolderNode){
    this.draggedFolder = folder;
  }

  addUploadFiles(files:FileList|null){
    if(!files){
      return;
    }
    for(var i = 0; i < files.length; i++ ){
      this.tasks.push(new MediaUploadTask(files[i]));
    }
  }

  removeTask(task:MediaUploadTask){
    this.tasks?.splice(this.tasks.indexOf(task), 1);
  }

  unshiftMedia(media?:MediaStore|null){
    if(media){
      this.medias.unshift(media);
    }
  }

  addMedias(medias:Array<IRxMedia>, hasMorePages:boolean, currentPage:number){
    this.hasMorePages = hasMorePages;
    this.currentPage = currentPage;
    if(medias){
      medias.forEach((media=>{
        this.medias.push(new MediaStore(media));
      }))
    }
  }

  setHasMorePages(hasMorePages:boolean){
    this.hasMorePages = hasMorePages;
  }

  toggleSelected(media:MediaStore){
    media.setSelected(!media.selected);
    if(this.singleSelective){
      this.medias.forEach((mediaStore)=>{
        if(mediaStore.id !== media.id){
          mediaStore.setSelected(false);
        }
      })
    }
  }

  get selectedMeidas(){
    return this.medias.filter(media=>media.selected).map(media=>media.rxMedia);
  }
}

export const MediasStoreContext = createContext<MediasStore>({} as MediasStore);
export const MediasStoreProvider = MediasStoreContext.Provider;

export const useMediasStore = (): MediasStore => useContext(MediasStoreContext);