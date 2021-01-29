
import productList from "./listPage";
import productListLayout from "./listPage/layout";
import productListHeader from "./listPage/header";
import productListList from "./listPage/list";
import productPage from "./editPage";
import productLayout from "./editPage/layout";
import productHeader from "./editPage/header";
import productBasePortlet from "./editPage/basePortlet";
import productSeoPortlet from "./editPage/seoPortlet";
import productContentPortLet from "./editPage/contentPortlet";
import productAppearancePortlet from "./editPage/appearancePortlet";
import productMedias from "./editPage/mediasPortlet";
import specsPortlet from "./editPage/specsPortlet";

export default{
  titleKey:'product',
  children:[
    {
      title:'列表页',
      meta:productList,
      children:[
        {
          title:'栅格布局',
          meta:productListLayout,
        },              
        {
          title:'页面标题',
          meta:productListHeader,
        },
        {
          title:'列表控件',
          meta:productListList,
        },
      ]        
    },
    {
      title:'编辑页',
      meta:productPage,
      children:[
        {
          title: '栅格布局',
          meta: productLayout,
        },
        {
          title:'页面标题',
          meta: productHeader,
        },
        {
          title:'基本信息',
          meta:productBasePortlet,
        },
        {
          title:'产品规格',
          meta:specsPortlet,
        },
        {
          title:'SEO数据',
          meta:productSeoPortlet,
        },
        {
          title:'内容',
          meta:productContentPortLet,
        },
        {
          title:'显示',
          meta:productAppearancePortlet,
        },
        {
          title:'媒体',
          meta:productMedias,
        },

      ]            
    },
  ]
}
