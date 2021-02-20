import { IRxMedia } from "Base/Model/IRxMedia";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { ID } from "rx-drag/models/baseTypes";
import { contains } from "rx-drag/utils/ArrayHelper";
import { FolderNode } from "./FolderNode";
import { getByIdFromTree } from "./FolderNode/getByIdFromTree";
import { MediaStore } from "./MediaStore";
import { MediaUploadTask } from "./MediaUploadTask";

export enum MediaSort{
  DESC_BY_CREATE_AT,
  ASC_BY_CREATE_AT,
  DESC_BY_NAME,
  ASC_BY_NAME
}

export class MediasStore{
  draggedFolder?:FolderNode;
  draggedMedia?:MediaStore;
  folders:Array<FolderNode> = [];
  selectedFolderId:ID = 0;
  gridLoading:boolean = false;
  medias:Array<MediaStore> = [];
  tasks:Array<MediaUploadTask> = [];
  hasMorePages:boolean = true;
  currentPage:number = 0;
  singleSelective?:boolean = false;
  keyword?:string = '';
  sortBy:MediaSort = MediaSort.DESC_BY_CREATE_AT;

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
    if(folderId !== this.selectedFolderId){
      this.tasks = [];
      this.medias = [];
      this.hasMorePages = true;    
      this.currentPage = 0;
      this.keyword = '';
    }
    this.selectedFolderId = folderId;
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

  setDraggedMedia(draggedMedia?:MediaStore){
    this.draggedMedia = draggedMedia;
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

  clearSelected(){
    this.medias.forEach((mediaStore)=>{
      mediaStore.setSelected(false);
    })
  }

  removeMedias(ids:Array<ID>){
    if(ids){
      this.medias = this.medias.filter(media=>!contains(media.id, ids));
    }
    
  }

  get selectedMedias(){
    return this.medias.filter(media=>media.selected).map(media=>media.rxMedia);
  }

  get selectedMediaStores(){
    return this.medias.filter(media=>media.selected);
  }

  setKeyword(keyword:string){
    if(keyword !== this.keyword){
      this.keyword = keyword;
      this.medias = [];
      this.currentPage = 0;
      this.hasMorePages = true;   
    }
  }

  setSortBy(sortBy:MediaSort){
    if(this.sortBy !== sortBy){
      this.medias = [];
      this.currentPage = 0;
      this.hasMorePages = true;   
    }
    this.sortBy = sortBy;
  }

  makeWhereGql(){
    let gql = ''
    if(this.keyword){
      let where = '';
      this.keyword.split(' ').forEach(word=>{
        let aWord = word.trim();
        if(aWord){
          where = where + ` { column: NAME, operator: LIKE, value: "%${aWord}%" } `
        }
      })
      gql = `where:{
        OR:[
          ${
            where
          }
        ]
      }`      
    }
    return gql;

  }

  makeSortByGql(){
    switch(this.sortBy){
      case MediaSort.DESC_BY_CREATE_AT:
        return `{ column: CREATED_AT, order: DESC }`;

        case MediaSort.ASC_BY_CREATE_AT:
          return `{ column: CREATED_AT, order: ASC }`;

        case MediaSort.DESC_BY_NAME:
           return `{ column: NAME, order: DESC }`;

        case MediaSort.ASC_BY_NAME:
          return `{ column: NAME, order: ASC }`;
    }

    return ''
  }
}

export const MediasStoreContext = createContext<MediasStore>({} as MediasStore);
export const MediasStoreProvider = MediasStoreContext.Provider;

export const useMediasStore = (): MediasStore => useContext(MediasStoreContext);