export default [
  {
    id:'1',
    name:'管理员',
    forbid:'<span style="background:#eee; border-radius:12px; padding:6px;">正常</span>',
    description:'只是个小小管理员',
    auth:[

    ],
  },
  {
    id:'3',
    name:'经理',
    forbid:false,
    description:'大经理，超级牛',
    auth:[

    ],
  },
  {
    id:'4',
    name:'测试',
    description:'只是个测试，哪来地位？',
    forbid:'<span style="background:red; border-radius:12px; padding:6px;color:#FFF;">禁用</span>',
    auth:[

    ],
  }
]