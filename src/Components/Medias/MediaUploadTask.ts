import { makeAutoObservable } from "mobx";
import createId from "rx-drag/utils/createId";

export class MediaUploadTask{
  id:number;
  file:File; 
  errorMessage?:string;
  uploading:boolean = false;
  constructor(file:File) {
    this.id = createId();
    this.file = file;
    makeAutoObservable(this)
  }

  get thumbnailUrl(){
    return URL.createObjectURL(this.file);
  }

  setUploading(uploading:boolean){
    this.uploading = uploading;
  }

  setErrorMessage(errorMessage?:string){
    this.errorMessage = errorMessage;
  }
}

