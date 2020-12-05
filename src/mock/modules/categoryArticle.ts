import article from "mock/views/article";
import articleAttributeEdit from "mock/views/articleAttributeEdit";
import articleAttributes from "mock/views/articleAttributes";
import articleChannel from "mock/views/articleChannel";
import articles from "mock/views/articles";
import articleTagEdit from "mock/views/articleTagEdit";
import articleTags from "mock/views/articleTags";

export default[
  {
    id:1,
    name:'文章管理',
    slug:'article',
    indexPageId:1,
    pages:[
      {
        id:1,
        name:'文章列表',
        slug:'articles',
        jsonSchema: articles,
      },
      {
        id:2,
        name:'文章编辑',
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
    name:'文章频道',
    indexPageId:21,
    pages:[
      {
        id:21,
        name:'频道编辑',
        slug:'article-channel-tree',
        jsonSchema: articleChannel,
      },
    ],
  },
  {
    id:3,
    slug:'article-tag',
    name:'文章标签',
    indexPageId:31,
    pages:[
      {
        id:31,
        name:'标签列表',
        slug:'article-tag-list',
        jsonSchema: articleTags,
      },
      {
        id:32,
        name:'标签编辑',
        slug:'article-tag-edit',
        jsonSchema: articleTagEdit,
      },
    ],
  },
  {
    id:4,
    slug:'article-attribute',
    name:'文章属性',
    indexPageId:41,
    pages:[
      {
        id:41,
        name:'属性列表',
        slug:'article-attribute-list',
        jsonSchema: articleAttributes,
      },
      {
        id:42,
        name:'属性编辑',
        slug:'article-attribute-edit',
        jsonSchema: articleAttributeEdit,
      },
    ],
  },

]