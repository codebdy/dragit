import { ID } from "rx-drag/models/baseTypes";
import { getModuleIndexPage } from "./getModuleIndexPage";
import { getPageById } from "./getPageById";

export function getModulePage(moduleSlug:string, pageId:ID) {
  if(pageId){
    return getPageById(pageId);
  }

  return getModuleIndexPage(moduleSlug);
}