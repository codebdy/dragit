import articles from '../views/articles'
import article from '../views/article'
import users from '../views/users'
import user from '../views/user'
import rolesPage from '../views/rolesPage'
import rolePage from '../views/rolePage'
import notificationPage from '../views/notificationPage'
import notificationViewPage from '../views/notificationViewPage'
import articleChannel from '../views/articleChannel'
import articleTags from '../views/articleTags'
import articleTagEdit from '../views/articleTagEdit'
import articleAttributes from 'mock/views/articleAttributes'
import articleAttributeEdit from 'mock/views/articleAttributeEdit'
import products from 'mock/views/products'
import product from 'mock/views/product'

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
    slug:'article-chanel',
    title:'文章频道',
    indexPageId:21,
    pages:[
      {
        id:21,
        title:'频道编辑',
        slug:'article-channel-tree',
        jsonSchema: articleChannel,
      },
    ],
  },
  {
    id:3,
    slug:'article-tag',
    title:'文章标签',
    indexPageId:31,
    pages:[
      {
        id:31,
        title:'标签列表',
        slug:'article-tag-list',
        jsonSchema: articleTags,
      },
      {
        id:32,
        title:'标签编辑',
        slug:'article-tag-edit',
        jsonSchema: articleTagEdit,
      },
    ],
  },
  {
    id:4,
    slug:'article-attribute',
    title:'文章属性',
    indexPageId:41,
    pages:[
      {
        id:41,
        title:'属性列表',
        slug:'article-attribute-list',
        jsonSchema: articleAttributes,
      },
      {
        id:42,
        title:'属性编辑',
        slug:'article-attribute-edit',
        jsonSchema: articleAttributeEdit,
      },
    ],
  },
  {
    id:5,
    title:'产品管理',
    slug:'product',
    indexPageId:51,
    pages:[
      {
        id:51,
        title:'产品列表',
        slug:'products',
        jsonSchema: products,
      },
      {
        id:52,
        title:'产品编辑',
        slug:'product-edit',
        jsonSchema: product,
      },
    ],
    auths:[
      {
        id:1,
        slug:"product-all",
        name:'产品模块',
      },
      {
        id:2,
        slug:"create-product",
        name:'新建产品',        
      },
      {
        id:3,
        slug:"edit-product",
        name:"产品编辑"
      }
    ]
  },
  {
    id:7,
    slug:'user',
    title:'管理员',
    indexPageId:71,
    pages:[
      {
        id:71,
        title:'管理员列表',
        slug:'urser-list',
        jsonSchema: users,
      },
      {
        id:72,
        title:'管理员编辑',
        slug:'edit-user',
        jsonSchema: user,
      },
    ],
  },
  {
    id:8,
    slug:'role',
    title:'角色',
    indexPageId:81,
    pages:[
      {
        id:81,
        title:'角色列表',
        slug:'role-list',
        jsonSchema: rolesPage,
      },
      {
        id:82,
        title:'角色编辑',
        slug:'edit-role',
        jsonSchema: rolePage,
      },
    ],
  },

  {
    id:9,
    slug:'notification',
    title:'通知',
    indexPageId:91,
    pages:[
      {
        id:91,
        title:'通知列表',
        slug:'notification-list',
        jsonSchema: notificationPage,
      },
      {
        id:92,
        title:'查看通知',
        slug:'view-notification',
        jsonSchema: notificationViewPage,
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
