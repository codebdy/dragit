import {API_GET_MODEL_BY_ID, API_SUBMIT_MODEL} from "APIs/model"
import ArticleMeta from "designer/PageEditor/Toolbox/templates/article/editPage";

export default {
  layout:[ArticleMeta],

  isFormPage:true,
  apiForGet:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Article',
    },      
  },

  apiForSave:{
    ...API_SUBMIT_MODEL,
    params:{
      modelName:'/Model/Article',
    },      
  }
}
