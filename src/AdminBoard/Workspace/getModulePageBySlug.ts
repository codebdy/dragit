import { IModule } from "base/Model/IModule";
import { IPage } from "base/Model/IPage";

export function getModulePageBySlug(module:IModule, pageSlug?:string):IPage|undefined{
  if(!module.pages || !pageSlug){
    return;
  }

  for(var i = 0; i < module.pages.length; i++){
    let page = module.pages[i];
    if(pageSlug === page.slug){
      return page;
    }
  }
  return;
}