import articles from '../views/articles'
import article from '../views/article'
import users from '../views/users'
import user from '../views/user'
import rolesPage from '../views/rolesPage'
import rolePage from '../views/rolePage'

var modules = [
  {
    id:21,
    slug:'dashboard',
    title:'仪表盘'
  },
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
    title:'管理员',
    indexPageId:31,
    pages:[
      {
        id:31,
        title:'管理员列表',
        slug:'urser-list',
        jsonSchema: users,
      },
      {
        id:32,
        title:'管理员编辑',
        slug:'edit-user',
        jsonSchema: user,
      },
    ],
  },
  {
    id:4,
    slug:'role',
    title:'角色',
    indexPageId:41,
    pages:[
      {
        id:41,
        title:'管理员列表',
        slug:'role-list',
        jsonSchema: rolesPage,
      },
      {
        id:42,
        title:'管理员编辑',
        slug:'edit-role',
        jsonSchema: rolePage,
      },
    ],
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
            return JSON.parse(JSON.stringify(pages[j]));
          }
        }
      }
      
    }
  }
}


export default modules;
