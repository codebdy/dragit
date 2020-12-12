import getQueryVariable from 'mock/utils/getQueryVariable';

export function getModelName(url) {
  let modelName = getQueryVariable('modelName', url);
  modelName = modelName?.replace(/%2F/g, '/');
  console.log(modelName)
  return modelName;
}
