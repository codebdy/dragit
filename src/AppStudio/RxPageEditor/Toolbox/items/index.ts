
import itemsCards from './itemsCards'
import itemsDispaly from './itemsDispaly'
import itemsForm from './itemsForm'
import itemsLayout from './itemsLayout'

export default [
  itemsLayout,
  itemsCards,
  itemsDispaly,
  itemsForm,

  {
    titleKey: "charts",
    children:[
      {
        titleKey:'antv-chart',
        meta:{
          name:'AntDesignChart',
          props:{
            chart:'Line',
            jsonProps:{},
          }
        }
      }
    ]
  },
]