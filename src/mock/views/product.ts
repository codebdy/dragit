import { API_GET_MODEL_BY_ID, API_SUBMIT_MODEL } from "APIs/model"
import productPage from "designer/PageEditor/Toolbox/templates/product/editPage"

export default {
  layout:[
    productPage
  ],


  isFormPage:true,
  apiForGet:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Product',
    },      
  },

  apiForSave:{
    ...API_SUBMIT_MODEL,
    params:{
      modelName:'/Model/Product',
    },      
  }
  
}
