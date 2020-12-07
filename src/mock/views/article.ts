import {API_GET_MODEL_BY_ID} from "APIs/model"
import ArticleMeta from "designer/PageEditor/Toolbox/Metas/ArticleMeta";

export default {
  layout:ArticleMeta,

  isFormPage:true,
  api:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Article',
    },      
  },

  
}
