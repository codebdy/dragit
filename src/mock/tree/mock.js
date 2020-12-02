import Mock from 'mockjs'
import articleChannels from './articleChannels'
import { getModelName } from '../utils/getModelName';

var trees = {
  '/Model/ArticleChannel':articleChannels,
}

window.trees = trees;

export default function mockTrees(){

  Mock.mock(RegExp('/api/data/get-model-tree?.*'),'get', (request)=>{
    let modelName = getModelName(request.url);
    return JSON.parse(JSON.stringify(window.trees[modelName]));
  })

}