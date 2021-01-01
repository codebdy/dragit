import { ID } from 'base/Model/graphqlTypes';
import moduleCategories from './moduleCategories';

export function getPageById(pageId:ID) {
  for (var index = 0; index < moduleCategories.length; index++) {
    let modules = moduleCategories[index].modules;
    for (var i = 0; i < modules.length; i++) {
      let module = modules[i];
      let pages = module.pages;
      if (pages) {
        for (var j = 0; j < pages.length; j++) {
          if (pages[j].id === pageId) {
            return JSON.parse(JSON.stringify(pages[j]));
          }
        }
      }
    }
  }
}
