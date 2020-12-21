import { getModuleIndexPage } from "./getModuleIndexPage";
import { getPageBySlug } from "./getPageBySlug";

export function getModulePage(moduleSlug:string, pageSlug:string) {
  if(pageSlug){
    return getPageBySlug(pageSlug);
  }

  return getModuleIndexPage(moduleSlug);
}