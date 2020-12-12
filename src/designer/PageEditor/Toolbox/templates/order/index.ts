
import orderList from "./listPage";
import orderListLayout from "./listPage/layout";
import orderListHeader from "./listPage/header";
import orderListList from "./listPage/list";
import orderPage from "./editPage";
import customerPortlet from "./editPage/customerPortlet";
import supplierPortlet from "./editPage/supplierPortlet";
import layout from "./editPage/layout";
import header from "./editPage/header";
import feesPortlet from "./editPage/feesPortlet";
import footer from "./editPage/footer";
import calcPortlet from "./editPage/calcPortlet";

export default{
  titleKey:'order',
  children:[
    {
      title:'列表页',
      meta:orderList,
      children:[
        {
          title:'栅格布局',
          meta:orderListLayout,
        },              
        {
          title:'页面标题',
          meta:orderListHeader,
        },
        {
          title:'列表控件',
          meta:orderListList,
        },
      ]        
    },
    {
      title:'编辑页',
      meta:orderPage,
      children:[
        {
          title: '栅格布局',
          meta: layout,
        },
        {
          title:'页面标题',
          meta: header,
        },
        {
          title:'客户合同',
          meta:customerPortlet,
        },
        {
          title:'工厂合同',
          meta:supplierPortlet,
        },
        {
          title:'订单费用',
          meta:feesPortlet,
        },
        {
          title:'提成核算',
          meta:calcPortlet,
        },
        {
          title:'显示',
          meta:footer,
        },

      ]            
    },
  ]
}
