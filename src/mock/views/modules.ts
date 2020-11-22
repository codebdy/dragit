import articles from './articles'
import article from './article'

var modules = [
  {
    id:1,
    title:'文章管理',
    indexPageId:1,
    pages:[
      {
        id:1,
        title:'文章列表',
        jsonSchema: articles,
      },
      {
        id:2,
        title:'文章编辑',
        jsonSchema: article,
      },
    ],
    auths:[
      {
        id:1,
        slug:"view-articles",
        name:'查看列表',
      },
      {
        id:2,
        slug:"create-article",
        name:'新建文章',        
      },
      {
        id:3,
        slug:"edit-article",
        name:"文章编辑"
      }
    ]
  },
  {
    id:2,
    title:'产品',
  },
  {
    id:3,
    title:'用户'
  },

  {
    id:21,
    title:'仪表盘'
  },

]

export function getModuleIndexPage(moduleId:number){
  for(var i = 0; i < modules.length; i++){
    let module = modules[i]
    if(module.id === moduleId){
      let pages = module.pages
      if(pages){
        for(var j=0; j < pages.length; j++){
          if(pages[j].id === module.indexPageId){
            return pages[j];
          }
        }
      }
      
    }
  }
}

export function getModulePage(pageId:number){
  for(var i = 0; i < modules.length; i++){
    let module = modules[i]
    let pages = module.pages
    if(pages){
      for(var j=0; j < pages.length; j++){
        if(pages[j].id === pageId){
          return pages[j];
        }
      }
    }
  }
}

export default modules;
