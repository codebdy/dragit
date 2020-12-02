import getQueryVariable from 'mock/utils/getQueryVariable';

export function getModelName(url) {
  let modelName = getQueryVariable('modelName', url);
  console.log(modelName, url);
  modelName = modelName?.replaceAll('%2F', '/');
  return modelName;
}
