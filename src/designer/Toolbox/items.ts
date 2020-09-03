export default [
  {
    id:"1",
    titleKey: "layout",
    icon:"mdi-view-dashboard",
    children:[
      //{
      //  id:"1-1",
      //  titleKey:"page-container",
      //  meta:{
      //    name:"Container",
      //  }
      //},  
      {
        id:"1-2",
        titleKey:"row",
        meta:{
          name:"Grid",
          props:{
            container:true,
          },
        }
      },  
      {
        id:"1-3",
        titleKey:"column",
        meta:{
          name:"Grid",
          props:{
            item:true,
            xs:12,
            md:true,
          },
        }
      },  
  
    ]
  },
  {
    id:"2",
    titleKey: "form",
    icon:"mdi-text-box",
    children:[
      {
        id:"2-1",
        title:"Card",
        meta:{
          name:"Card",
          props:{
            elevation: 6,
            style:{
              //marginTop: '16px',
            }
          },
          children:[
            {
              name:"CardHeader",
              props:{
                title:'Form Card',
              }          
            },
            {
              name:"CardContent",
            }
          ]          
        }
      },  
      {
        id:"2-2",
        title:"Card Header",
        meta:{
          name:"CardHeader",
          props:{
            title:'Card Header',
          }          
        }
      },  
      {
        id:"2-3",
        title:"Card Content",
        meta:{
          name:"CardContent",
          props:{
          }          
        }
      },  
      {
        id:"2-4",
        title:"Card Actions",
        meta:{
          name:"CardActions",
          props:{
          }          
        }
      }, 
      {
        id:"2-5",
        title:"TextField",
        meta:{
          name:"FormField",
          props:{
            as:"TextField",
            variant:"outlined",
          }
        }
      }, 
      {
        id:"2-6",
        title:"Button",
        meta:{
          name:"Button",
          text: "Button",
          props:{
            variant:"contained",
          }
        }
      }, 
      {
        id:"2-7",
        title:"Typography",
        meta:{
          name:"Typography",
          props:{
            variant:"inherit",
            rxText: "Typography",
          }
        }
      }, 
    ]
  },

  {
    id:"3",
    titleKey: "relations",
    icon:"mdi-relation-many-to-many",
  },
  {
    id:"4",
    titleKey: "customized",
    icon:"mdi-puzzle",
  },
]