import  productsData  from "mock/cms/product/productsData";
import { sleep } from "../../utils/sleep";

var idSeed = 1000;

export const product = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock product', args);
  for(var i = 0; i < productsData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(productsData[i].id == args.id){
      return productsData[i];
    }
  }
  return 
}

export const products = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return {data:productsData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const removeProducts = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('removeProducts', args)
  return productsData
}

export const updateProducts = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('updateProducts', args)
  return productsData
}

export const saveProduct = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);

  console.log('Server received product data:', args);
  let product = {...args.product, id:args.product?.id || idSeed++, created_at:''}
  if(product?.seoMeta && !product?.seoMeta.id){
    product.seoMeta.id = ++idSeed;
  }
  return product;
}

export const productQueryResolvers = {
  product,
  products,
}


export const productMutationResolvers = {
  removeProducts,
  updateProducts,
  saveProduct
}