export default{
  name:'Portlet',
  props: {
    variant:'outlined',
    open:true,
    withHeader:true,
    title:'内容',
    collapsible: true,
    marginTop:2,
  },
  children:[
    {
      name:"TinyMCE",
      field:'content',
      props:{
        height:500,
      }

    }
  ]
}