import article from './editPage';
import articleLayout from './editPage/layout';
import articleHeader from './editPage/header';
import articleBasePortlet from './editPage/basePortlet';
import articleSeoPortlet from './editPage/seoPortlet';
import articleContentPortLet from './editPage/contentPortlet';
import articleAppearancePortlet from './editPage/appearancePortlet';
import articleMedias from './editPage/mediasPortlet';
import aritcleList from './listPage';
import articleListHeader from './listPage/header';
import articleListLayout from './listPage/layout';
import aritcleListList from './listPage/list';

export default{
  titleKey:'article',
  children:[
    {
      title:'列表页',
      meta:aritcleList,
      children:[
        {
          title:'栅格布局',
          meta:articleListLayout,
        },              
        {
          title:'页面标题',
          meta:articleListHeader,
        },
        {
          title:'列表控件',
          meta:aritcleListList,
        },
      ]        
    },
    {
      title:'编辑页',
      meta:article,
      children:[
        {
          title: '栅格布局',
          meta: articleLayout,
        },
        {
          title:'页面标题',
          meta: articleHeader,
        },
        {
          title:'基本信息',
          meta:articleBasePortlet,
        },
        {
          title:'SEO数据',
          meta:articleSeoPortlet,
        },
        {
          title:'内容',
          meta:articleContentPortLet,
        },
        {
          title:'显示',
          meta:articleAppearancePortlet,
        },
        {
          title:'媒体',
          meta:articleMedias,
        },

      ]            
    },
  ]
}
