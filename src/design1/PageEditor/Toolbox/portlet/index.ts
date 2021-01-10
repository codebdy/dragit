export default{
  name:'Portlet',
  props: {
    elevation: 6,
    open:true,
    withHeader:true,
    title:'Portlet',
    collapsible: true,
  },
  children:[
    {
      name:'FormGridContainer',
    },
    {
      name:'PortletFooter',
      text:'Footer',
    }
  ]
}
