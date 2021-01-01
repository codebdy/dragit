import { ID } from "base/Model/graphqlTypes";
import { getModuleIndexPage } from "./getModuleIndexPage";
import { getPageById } from "./getPageById";

export function getModulePage(moduleSlug:string, pageId:ID) {
  if(pageId){
    return getPageById(pageId);
  }

  return getModuleIndexPage(moduleSlug);
}