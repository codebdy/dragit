import moduleCategories from './moduleCategories';

export function getModuleIndexPage(moduleSlug:string) {
  for (var index = 0; index < moduleCategories.length; index++) {
    let modules = moduleCategories[index].modules;
    for (var i = 0; i < modules.length; i++) {
      let module = modules[i] as any;
      if (module.slug === moduleSlug) {
        let pages = module.pages;
        if (pages) {
          for (var j = 0; j < pages.length; j++) {
            if (pages[j].id === module.entryPageId) {
              return JSON.parse(JSON.stringify(pages[j]));
            }
          }
        }
      }
    }
  }
}
