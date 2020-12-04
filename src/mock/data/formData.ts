export default{
  name:'名称',
  title:'有时就像蒲公英，看似自由自在，实则身不由己',
  slug:'',
  auther:'悠闲地水',
  create_date:'2020-04-04',
  category:'',
  tags:'苹果',  
  tags2:['苹果'],
  medias:[
    {
      id:'1',
      thumbnail: '/static/images/grid-list/breakfast.jpg',
      title: 'Breakfast',
      alt:'第一个',
    },
    {
      id:'2',
      thumbnail: '/static/images/grid-list/burgers.jpg',
      title: 'Tasty burger',
      alt:'第二个',
    },
    {
      id:'3',
      thumbnail: '/static/images/grid-list/camera.jpg',
      title: 'Camera',
    },
  
  ],

  onetoManyField:[
    {
      id:'1',
      no:'合同1',
      supplier:'苹果科技',
    },
    {
      id:'2',
      no:'合同3',
      supplier:'苹果科技',
    },
    {
      id:'3',
      no:'合同3',
      supplier:'华为荣耀',
    },
  ]

}