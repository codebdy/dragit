import { API_GET_MODEL_BY_ID } from "APIs/model"
import productPage from "designer/PageEditor/Toolbox/templates/product/editPage"

export default {
  layout:[
    productPage
  ],


  isFormPage:true,
  api:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Product',
    },      
  },

  
}
