
export default{
  name:'Portlet',
  props: {
    variant:'outlined',
    open:true,
    withHeader:true,
    title:'基本信息',
    collapsible: true,
  },
  children:[
    {
      name:'FormGridContainer',
      children:[
        {
          name: 'PortletGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              field:'title',
              rule:{
                valueType:'string',
                required:true,
              },  
              props:{
                label:'标题',
                variant:"outlined",
                fullWidth:true,
              }
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:12,                      
          },
          children:[
            {
              name:'TextBox',
              field:'slug',
              props:{
                label:'Slug',
                variant:"outlined",
                fullWidth:true,
                //required:true,
              },
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:6,
          },
          children:[
            {
              name:'TextBox',
              field:'auther',
              props:{
                label:'作者',
                variant:"outlined",
                fullWidth:true,
                //required:true,
                helperText:'作者提示',
              },
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:6,
          },
          children:[
            {
              name:'TextBox',
              field:'email',
              rule:{
                valueType:'string',
                ruleType:'email',
                required:true,
              },
              props:{
                label:'Email',
                variant:"outlined",
                fullWidth:true,
              },
            }
          ]

        },
        {
          name: 'PortletGridItem',
          props:{
            xs:6,
          },
          children:[
            {
              name:'TreeSelect',
              field:'channel',
              designProps:{
                query:null,
              },
              props:{
                label:"频道",
                variant:"outlined",
                fullWidth:true,
                multiSelect:true,
                //size:"small",
                xs:6,
                query:'channelTree',
              },        
            }
          ],
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'Combobox',
              field:'tags',
              props:{
                label:"标签",
                variant:"outlined",
                multiple:true,
                fullWidth:true,
                query:'allPostTags',
              },                         
            }
          ]

        },

        {
          name:"PortletGridItem",
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                fullWidth: true,
                label:'简介',
                variant:"outlined",
                //size:"small",
                multiline:true,
                rows:5,
              }                        
            }
          ]

        }
        
      ]
    },
  ]
}