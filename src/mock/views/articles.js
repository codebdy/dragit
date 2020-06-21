export default [{
  name: 'Grid',
  props: {
      container: true,
      justify: 'space-between',
      alignItems: "center",
  },
  children: [{
          name: 'Grid',
          props: {
              item: true,
          },
          children: [{
              name: 'h2',
              text: '文章列表',
          }],
      },
      {
        name: 'Grid',
        //text: 'test',
        props: {
          item: true,
        },
        children: [
        {
          name: 'Button',
          text: '新建',
          props: {
            variant: "contained",
            color: "primary",
            type: "submit",
            //size: "large",
            style: {
              fontSize: '1.1rem',
            },
            onClick:{
              name:'JumpToPage',
              pageId:'article',
              dataId:'1',
            }
          }
        }]
      },
  ]
},
]