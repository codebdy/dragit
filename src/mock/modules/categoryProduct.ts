import product from "mock/views/product";
import productAttributeEdit from "mock/views/productAttributeEdit";
import productAttributes from "mock/views/productAttributes";
import productCategories from "mock/views/productCategories";
import products from "mock/views/products";

export default [
  {
    id:5,
    name:'产品管理',
    slug:'product',
    indexPageId:51,
    pages:[
      {
        id:51,
        name:'产品列表',
        slug:'products',
        schema: products,
      },
      {
        id:52,
        name:'产品编辑',
        slug:'product-edit',
        schema: product,
      },
    ],
    auths:[
      {
        id:1,
        slug:"product-all",
        name:'产品模块',
      },
      {
        id:2,
        slug:"create-product",
        name:'新建产品',        
      },
      {
        id:3,
        slug:"edit-product",
        name:"产品编辑"
      }
    ]
  },
  {
    id:6,
    slug:'product-category',
    name:'产品分类',
    indexPageId:61,
    pages:[
      {
        id:61,
        name:'产品分类编辑',
        slug:'product-category-tree',
        schema: productCategories,
      },
    ],
  },
  {
    id:10,
    slug:'product-attribute',
    name:'产品属性',
    indexPageId:101,
    pages:[
      {
        id:101,
        name:'属性列表',
        slug:'product-attribute-list',
        schema: productAttributes,
      },
      {
        id:102,
        name:'属性编辑',
        slug:'product-attribute-edit',
        schema: productAttributeEdit,
      },
    ],
  },

]