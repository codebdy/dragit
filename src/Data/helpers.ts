import { mediaServerUrl } from "./serverConfig";

export function getImageThumbnail(name:string|undefined){
  if(!name){
    return name
  }
  return `${mediaServerUrl}/thumbnails/${name}`;
}

export function getMediaSrc(name:string){
  return `${mediaServerUrl}/uploads/${name}`;
}