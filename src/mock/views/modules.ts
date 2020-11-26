import articles from './articles'
import article from './article'

var modules = [
  {
    id:1,
    title:'文章管理',
    slug:'article',
    indexPageId:1,
    pages:[
      {
        id:1,
        title:'文章列表',
        slug:'articles',
        jsonSchema: articles,
      },
      {
        id:2,
        title:'文章编辑',
        slug:'article',
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
    slug:'product',
    title:'产品',
  },
  {
    id:3,
    slug:'user',
    title:'用户'
  },

  {
    id:21,
    slug:'dashboard',
    title:'仪表盘'
  },

]

export function getModuleIndexPage(moduleSlug:string){
  for(var i = 0; i < modules.length; i++){
    let module = modules[i]
    if(module.slug === moduleSlug){
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

export function getModulePage(pageSlug:string){
  for(var i = 0; i < modules.length; i++){
    let module = modules[i]
    let pages = module.pages
    if(pages){
      for(var j=0; j < pages.length; j++){
        if(pages[j].slug === pageSlug){
          return pages[j];
        }
      }
    }
  }
}

export default modules;
