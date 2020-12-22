import article from "mock/views/article";
import articleAttributeEdit from "mock/views/articleAttributeEdit";
import articleAttributes from "mock/views/articleAttributes";
import articleChannel from "mock/views/articleChannel";
import articles from "mock/views/articles";
import articleTagEdit from "mock/views/articleTagEdit";
import articleTags from "mock/views/articleTags";
import { DRAWER_STYLE_MODULE, JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "utils/consts";

export default[
  {
    id:1,
    name:'页面跳转式',
    slug:JUMP_STYLE_MODULE,
    moduleType:JUMP_STYLE_MODULE,
    entryPageId:1,
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
    slug:POPUP_STYLE_MODULE,
    moduleType:POPUP_STYLE_MODULE,
    name:'对话框式',
    entryPageId:21,
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
    slug:DRAWER_STYLE_MODULE,
    moduleType:DRAWER_STYLE_MODULE,
    name:'右侧滑出式',
    entryPageId:31,
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
    slug:TAB_STYLE_MODULE,
    moduleType:TAB_STYLE_MODULE,
    name:'选项卡式',
    entryPageId:41,
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