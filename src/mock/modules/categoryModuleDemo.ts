import article from "mock/views/article";
import articleAttributeEdit from "mock/views/articleAttributeEdit";
import articleAttributes from "mock/views/articleAttributes";
import articles from "mock/views/articles";
import articleTagEdit from "mock/views/articleTagEdit";
import articleTags from "mock/views/articleTags";
import user from "mock/views/user";
import users from "mock/views/users";
import { DRAWER_STYLE_MODULE, JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "utils/consts";

export default[
  {
    id:101,
    name:'页面跳转式',
    slug:JUMP_STYLE_MODULE,
    moduleType:JUMP_STYLE_MODULE,
    entryPageId:1011,
    pages:[
      {
        id:1011,
        name:'文章列表',
        slug:'articles',
        maxWidth:'false',
        schema: articles,
      },
      {
        id:1012,
        name:'文章编辑',
        slug:'article',
        maxWidth:'false',
        schema: article,
      },
    ],
    auths:[
    ]
  },
  {
    id:11,
    slug:POPUP_STYLE_MODULE,
    moduleType:POPUP_STYLE_MODULE,
    name:'管理员',
    entryPageId:111,
    pages:[
      {
        id:111,
        name:'管理员列表',
        slug:'urser-list',
        maxWidth:'md',
        schema: users,
      },
      {
        id:112,
        name:'管理员编辑',
        maxWidth:'md',
        slug:'edit-user',
        schema: user,
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