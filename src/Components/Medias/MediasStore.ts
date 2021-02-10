import { IRxMedia } from "Base/Model/IRxMedia";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { FolderNode } from "./MediaFolder";

export class MediasStore{
  draggedFolder?:FolderNode;
  draggedMedia?:IRxMedia;
  folders:Array<FolderNode> = [];
  selectedFolder:string = 'root';
  gridLoading:boolean = false;
  medias:Array<IRxMedia> = [];
  selectedMedias:Array<IRxMedia> = [];
  pageNumber:number = 0;
  hasMore:boolean = true;

  constructor() {
    makeAutoObservable(this)
  }
  
}

export const MediasStoreContext = createContext<MediasStore>({} as MediasStore);
export const MediasStoreProvider = MediasStoreContext.Provider;

export const useMediasStore = (): MediasStore => useContext(MediasStoreContext);