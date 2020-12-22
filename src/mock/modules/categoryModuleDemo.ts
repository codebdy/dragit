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
    name:'页面跳转式',
    slug:'jump-style-module',
    indexPageId:1,
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
    ]
  },
  {
    id:2,
    slug:'popup-style-module',
    name:'对话框式',
    indexPageId:21,
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
    slug:'drawer-style-module',
    name:'右侧滑出式',
    indexPageId:31,
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
    slug:'tab-style-module',
    name:'选项卡式',
    indexPageId:41,
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