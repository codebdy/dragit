export default{
  name: 'GridRow',
  props: {
    justify: 'space-between',
    alignItems: "center",
    marginTop: 2,
    spacing: 2,
  },
  children: [{
      name: 'GridColumn',
      children: [
        {
          name: 'Typography',
          props:{
            variant:'h5',
            rxText: '1对多面板',            
          }
        }
      ],
    },
    {
      name: 'GridColumn',
      children: []
    },
  ]
}