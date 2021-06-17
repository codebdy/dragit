import { mediaServerUrl } from "./configs";

export function getImageThumbnail(name:string){
  return `${mediaServerUrl}/thumbnails/${name}`;
}

export function getMediaSrc(name:string){
  return `${mediaServerUrl}/uploads/${name}`;
}