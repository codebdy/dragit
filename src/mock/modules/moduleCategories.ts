import categoryArticle from "./data/categoryArticle";
import categoryEnquiry from "./data/categoryEnquiry";
import categoryModuleDemo from "./data/categoryModuleDemo";
import categoryOrder from "./data/categoryOrder";
import categoryProduct from "./data/categoryProduct";
import categorySystem from "./data/categorySystem";
import categoryUser from "./data/categoryUser";

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
