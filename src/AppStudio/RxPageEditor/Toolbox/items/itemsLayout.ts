export default{
  titleKey: "layout",
  children:[
    {
      titleKey:'row',
      meta:{name:'GridRow'},
    },
    {
      titleKey:"column",
      meta:{name:'GridColumn'},
    },  
    {
      titleKey:"page-title",
      meta:{
        name:"h2",
        props:{
          rxText:'Page title',
        }
      }
    }, 
    {
      titleKey:"typography",
      meta:{
        name:"Typography",
        props:{
          variant:"inherit",
          rxText: "Typography",
        }
      }
    }, 

    {
      titleKey:"medias",
      meta:{name:'Medias'},
    },       
  ]
}