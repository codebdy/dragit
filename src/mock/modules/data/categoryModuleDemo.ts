import article from "mock/article/post/views/article";
import articleAttributes from "mock/article/articleAttributes";
import articleChannel from "mock/article/articleChannel";
import articles from "mock/article/post/views/articles";
import articleTags from "mock/article/articleTags";
import user from "mock/views/user";
import users from "mock/views/users";
import { JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "utils/consts";

export default[
  {
    id:101,
    name:'页面跳转式',
    slug:JUMP_STYLE_MODULE,
    module_type:JUMP_STYLE_MODULE,
    entry_page_id:1011,
    pages:[
      {
        id:1011,
        name:'文章列表',
        slug:'articles',
        max_width:'false',
        schema: articles,
      },
      {
        id:1012,
        name:'文章编辑',
        slug:'article',
        max_width:'false',
        schema: article,
      },
    ],
    auths:[
    ]
  },
  {
    id:11,
    slug:POPUP_STYLE_MODULE,
    module_type:POPUP_STYLE_MODULE,
    name:'管理员',
    entry_page_id:111,
    pages:[
      {
        id:111,
        name:'管理员列表',
        slug:'urser-list',
        max_width:'lg',
        schema: users,
      },
      {
        id:112,
        name:'管理员编辑',
        max_width:'md',
        slug:'edit-user',
        schema: user,
      },
    ],
  },
  {
    id:13,
    slug:POPUP_STYLE_MODULE + 2,
    module_type:POPUP_STYLE_MODULE,
    is_drawer_style: true,
    name:'右侧滑出式',
    entry_page_id:131,
    pages:[
      {
        id:131,
        name:'管理员列表',
        slug:'urser-list',
        max_width:'lg',
        schema: users,
      },
      {
        id:132,
        name:'管理员编辑',
        max_width:'md',
        width:450,
        slug:'edit-user',
        schema: user,
      },
    ],
  },
  {
    id:14,
    slug:TAB_STYLE_MODULE,
    module_type:TAB_STYLE_MODULE,
    name:'文章管理',
    entry_page_id:141,
    pages:[
      {
        id:141,
        name:'文章列表',
        in_tab_index:true,
        slug:'article-list-2',
        schema: articles,
      },
      {
        id:142,
        name:'草稿箱',
        in_tab_index:true,
        slug:'article-drafts',
        schema: articles,
      },
      {
        id:143,
        name:'频道',
        in_tab_index:true,
        slug:'article-channel-2',
        schema: articleChannel,
      },

      {
        id:144,
        name:'标签',
        in_tab_index:true,
        slug:'article-tag-list',
        schema: articleTags,
      },
      {
        id:145,
        name:'附加属性',
        in_tab_index:true,
        slug:'article-attribute-list',
        schema: articleAttributes,
      },
      {
        id:146,
        name:'文章编辑',
        slug:'article',
        max_width:'false',
        schema: article,
      },
    ],
  },

]