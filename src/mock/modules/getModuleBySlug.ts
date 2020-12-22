import moduleCategories from './moduleCategories';


export function getModuleBySlug(slug?:string) {
  for (var index = 0; index < moduleCategories.length; index++) {
    let modules = moduleCategories[index].modules;
    for (var i = 0; i < modules.length; i++) {
      let module = modules[i] as any;
      if (module.slug === slug) {
        for(var j = 0; j < module.pages.length; j++){
          let page =  module.pages[j];
          if(page.id === module.entryPageId){
            module.entryPage = page;
          }
        }
        return module;
      }
    }
  }

}
