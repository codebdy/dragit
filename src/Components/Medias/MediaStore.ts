import { IRxMedia } from "Base/Model/IRxMedia";
import { makeAutoObservable } from "mobx";

export class MediaStore implements IRxMedia{
  private rxMedia: IRxMedia;

  constructor(rxMedia:IRxMedia) {
    this.rxMedia = rxMedia;
    makeAutoObservable(this)    
  }

  get id(){
    return this.rxMedia.id;
  }

  get name(){
    return this.rxMedia.name;
  }

  get thumbnail(){
    return this.rxMedia.thumbnail;
  }
  get src(){
    return this.rxMedia.src;
  }

  get alt(){
    return this.rxMedia.alt;
  }
}