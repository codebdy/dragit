import {API_GET_MODEL_BY_ID, API_SUBMIT_MODEL} from "APIs/model"
import editPage from "designer/PageEditor/Toolbox/templates/order/editPage";

export default {
  layout:[
    editPage,    
  ],


  isFormPage:true,
  apiForGet:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Order',
    },      
  },

  apiForSave:{
    ...API_SUBMIT_MODEL,
    params:{
      modelName:'/Model/Order',
    },      
  }
  
}
