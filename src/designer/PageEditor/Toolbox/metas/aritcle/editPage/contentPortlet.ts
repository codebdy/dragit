export default{
  name:'Portlet',
  props: {
    elevation: 6,
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
        field:'content'
      }

    }
  ]
}