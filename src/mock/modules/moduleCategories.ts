import categoryArticle from "./categoryArticle";
import categoryEnquiry from "./categoryEnquiry";
import categoryModuleDemo from "./categoryModuleDemo";
import categoryOrder from "./categoryOrder";
import categoryProduct from "./categoryProduct";
import categorySystem from "./categorySystem";
import categoryUser from "./categoryUser";

var moduleCategories = [
  {
    id:1,
    name:'文章管理',
    modules:categoryArticle,
  },
  {
    id:2,
    name:'产品管理',
    modules:categoryProduct,
  },
  {
    id:3,
    name:'客户关系',
    modules:categoryOrder,
  },
  {
    id:4,
    name:'询盘管理',
    modules:categoryEnquiry,
  },
  {
    id:5,
    name:'用户管理',
    modules:categoryUser,
  },
  {
    id:6,
    name:'系统管理',
    modules:categorySystem,
  },
  {
    id:7,
    name:'标准CRUD',
    modules:[]
  },
  {
    id:8,
    name:'模块样式',
    modules:categoryModuleDemo
  }

]

export default moduleCategories;
