import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class MediasStore{
  constructor() {
    makeAutoObservable(this)
  }
  
}

export const MediasStoreContext = createContext<MediasStore>({} as MediasStore);
export const MediasStoreProvider = MediasStoreContext.Provider;

export const useMediasStore = (): MediasStore => useContext(MediasStoreContext);