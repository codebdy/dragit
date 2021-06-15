import { IRxMedia } from "Base/Model/IRxMedia";
import { makeAutoObservable } from "mobx";

export class MediaStore implements IRxMedia{
  private _rxMedia: IRxMedia;

  selected:boolean = false;
  loading:boolean = false;

  constructor(rxMedia:IRxMedia) {
    this._rxMedia = rxMedia;
    makeAutoObservable(this)    
  }

  get id(){
    return this._rxMedia.id;
  }

  get name(){
    return this._rxMedia.name;
  }

  set name(name:string){
    this._rxMedia.name = name;
  }

  get thumbnail(){
    return this._rxMedia.thumbnail;
  }
  get fileName(){
    return this._rxMedia.fileName;
  }

  get alt(){
    return this._rxMedia.alt;
  }

  setSelected(selected:boolean){
    this.selected = selected;
  }

  get rxMedia(){
    return this._rxMedia;
  }

  setLoading(loading:boolean){
    this.loading = loading;
  }
}