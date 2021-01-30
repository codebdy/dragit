import { IModule } from "Base/Model/IModule";
import { IRxPage } from "Base/Model/IRxPage";

export function getModulePageById(module:IModule, pageId?:string):IRxPage|undefined{
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