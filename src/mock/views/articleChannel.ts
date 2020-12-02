import { API_GET_MODEL_TREE, API_SAVE_MODEL_TREE } from "APIs/tree";

export default {
  withoutForm:true,
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
      },
      children: [
        {
          name: 'GridColumn',
          props: {
            xs:10,
          },
          children: [          {
            name:'TreeEditor',
            props:{
              title:'文章频道',
              elevation:6,
              marginTop:4,
              apiForGet:{
                ...API_GET_MODEL_TREE,
                params:{
                  modelName:'/Model/ArticleChannel',
                },      
              },
              apiForSave:{
                ...API_SAVE_MODEL_TREE,
                params:{
                  modelName:'/Model/ArticleChannel',
                },
              }
            }
          }],
        }
      ]
    },
  ] 
}
