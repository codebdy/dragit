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
      props:{
        height:500,
        field:'content'
      }

    }
  ]
}