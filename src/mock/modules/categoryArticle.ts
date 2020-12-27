import article from "mock/post/views/article";
import articleAttributeEdit from "mock/views/articleAttributeEdit";
import articleAttributes from "mock/views/articleAttributes";
import articleChannel from "mock/views/articleChannel";
import articles from "mock/post/views/articles";
import articleTagEdit from "mock/views/articleTagEdit";
import articleTags from "mock/views/articleTags";

export default[
  {
    id:1,
    name:'文章管理',
    slug:'article',
    entry_page_id:1,
    pages:[
      {
        id:1,
        name:'文章列表',
        slug:'articles',
        schema: articles,
      },
      {
        id:2,
        name:'文章编辑',
        slug:'article',
        schema: article,
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
    entry_page_id:21,
    pages:[
      {
        id:21,
        name:'频道编辑',
        slug:'article-channel-tree',
        schema: articleChannel,
      },
    ],
  },
  {
    id:3,
    slug:'article-tag',
    name:'文章标签',
    entry_page_id:31,
    pages:[
      {
        id:31,
        name:'标签列表',
        slug:'article-tag-list',
        schema: articleTags,
      },
      {
        id:32,
        name:'标签编辑',
        slug:'article-tag-edit',
        schema: articleTagEdit,
      },
    ],
  },
  {
    id:4,
    slug:'article-attribute',
    name:'文章属性',
    entry_page_id:41,
    pages:[
      {
        id:41,
        name:'属性列表',
        slug:'article-attribute-list',
        schema: articleAttributes,
      },
      {
        id:42,
        name:'属性编辑',
        slug:'article-attribute-edit',
        schema: articleAttributeEdit,
      },
    ],
  },

]