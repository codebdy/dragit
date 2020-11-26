export default [{
        //type:subheader, item, group
        type: 'subheader',
        title: '应用',
    },
    {
        type: 'item',
        title: '仪表盘',
        to: '/admin/dashboard',
        icon: 'mdi-speedometer',
        chip: {
            color: 'primary',
            label: '新',
            size: 'small',
        }
    },

    {
        type: 'item',
        title: '文章管理',
        to: '/admin/module/article/',
        icon: 'mdi-home',
    },
    {
        type: 'item',
        title: '媒体库',
        to: '/admin/medias',
        icon: 'mdi-image-auto-adjust',
    },
    {
        title: '文章管理',
        type: 'group',
        icon: 'mdi-text-box-outline',
        children: [{
                type: 'subheader',
                title: '二级应用',
            },
            {
                id: "2-1",
                title: '添加文章',
                type: 'item',
                to: { name: 'dashboard' },
                icon: 'mdi-circle-small',
            },
            {
                id: "2-2",
                title: '文章列表',
                type: 'item',
                to: { name: 'dashboard' },
                icon: 'mdi-circle-small',
                badge: {
                    color: 'secondary',
                    field: 'temp',
                    size: 'small',
                }
            },

        ],
    },
    {
        id:'divider1',
        type:'divider',
    },
    {
        id: "3",
        title: '多级嵌套',
        type: 'group',
        icon: 'mdi-file-tree-outline',
        children: [{
                id: "3-1",
                title: '层级2',
                type: 'group',
                to: { name: 'dashboard' },
                icon: 'mdi-chart-line',
                children: [{
                        id: "3-2-1",
                        title: '层级3',
                        type: 'item',
                        to: { name: 'dashboard' },
                        icon: 'mdi-brightness-percent',
                        badge: {

                            color: 'secondary',
                            label: 'temp2',
                            size: 'small',
                        }
                    },

                ]
            },
            {
                id: "3-2",
                title: '文章列表',
                type: 'item',
                to: { name: 'dashboard' },
                icon: 'mdi-tree-outline',
            },

        ],
    },
    {
        title: '询盘',
        type: 'item',
        to: { name: 'dashboard' },
        icon: 'mdi-email-outline',
        badge: {
            color: 'secondary',
            field: 'inquiries',
            size: 'small',
        }    
    },
    {
        title:"用户",
        type: 'group',
        icon: 'mdi-account-circle',
        children: [
            {
                title:"管理员",
                type:'item',
                icon: 'mdi-account'
            },
            {
                title:"角色",
                type:'item',
                icon: 'mdi-account-key'
            }

        ]
    }
]