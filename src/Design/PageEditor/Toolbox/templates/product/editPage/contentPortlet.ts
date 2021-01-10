export default{
  name:'Portlet',
  props: {
    elevation: 6,
    open:true,
    withHeader:true,
    title:'产品详情',
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