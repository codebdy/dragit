export default [
  {
    id:"1",
    titleKey: "layout",
    icon:"mdi-view-dashboard",
    children:[
      {
        id:"1-1",
        title:"页面容器",
        name:"Container",
        props:{

        },
      },  
      {
        id:"1-2",
        title:"栅格容器",
        name:"Grid",
        props:{
          container:true,
        },
      },  
      {
        id:"1-3",
        title:"栅格项",
        name:"Grid",
        props:{
          item:true,
        },
      },  
      //{
      //  id:"1-4",
      //  title:"弹性盒子",
      //  name:"Box",
     //   props:{
      //    item:true,
      //  },
      //},  
    ]
  },
  {
    id:"2",
    titleKey: "form",
    icon:"mdi-text-box",
    children:[
      {
        id:"2-1",
        title:"Container",
        name:"Container",
        props:{

        },
      },  
      {
        id:"2-2",
        title:"Grid:Container",
        name:"Grid",
        props:{
          container:true,
        },
      },  
      {
        id:"2-3",
        title:"Grid:Item",
        name:"Grid",
        props:{
          item:true,
        },
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