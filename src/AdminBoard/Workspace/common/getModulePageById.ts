import { IModule } from "base/Model/IModule";
import { IPage } from "base/Model/IPage";

export function getModulePageById(module:IModule, pageId?:string):IPage|undefined{
  if(!module.pages || !pageId){
    return;
  }

  for(var i = 0; i < module.pages.length; i++){
    let page = module.pages[i];
    if(pageId === page.id){
      return page;
    }
  }
  return;
}