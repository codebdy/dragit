import moduleCategories from './moduleCategories';


export function getModuleById(muduleId) {
  for (var index = 0; index < moduleCategories.length; index++) {
    let modules = moduleCategories[index].modules;
    for (var i = 0; i < modules.length; i++) {
      let module = modules[i];
      if (module.id.toString() === muduleId) {
        return module;
      }
    }
  }

}
