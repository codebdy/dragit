import { ID } from "Base/Model/graphqlTypes";

var pageTemplates = [
  {
    id:'guid-t-1',
    name:'空白页',
    schema:[],
  },

  {
    id:'guid-t-2',
    name:'产品页',
    schema:[],
    thumbnail:'',
  },

  {
    id:'guid-t-3',
    name:'文章页',
    schema:[],
    thumbnail:''
  },
]

export default pageTemplates;

export function getTemplate(id:ID){
  for(var i = 0; i < pageTemplates.length; i++){
    if(pageTemplates[i].id === id){
      return pageTemplates[i];
    }
  }
}