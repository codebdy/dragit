import moduleCategories from './moduleCategories';

export function getPageBySlug(pageSlug:string) {
  for (var index = 0; index < moduleCategories.length; index++) {
    let modules = moduleCategories[index].modules;
    for (var i = 0; i < modules.length; i++) {
      let module = modules[i];
      let pages = module.pages;
      if (pages) {
        for (var j = 0; j < pages.length; j++) {
          if (pages[j].slug === pageSlug) {
            return JSON.parse(JSON.stringify(pages[j]));
          }
        }
      }
    }
  }
}
