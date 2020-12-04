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
        },
        auths:['view-article', 'products-list']
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
        children: [
            {
                title: '文章',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/article/',
            },
            {
                title: '频道',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/article-chanel',
            },
            {
                title: '标签',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/article-tag',
            },
            {
                title: '属性',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/article-attribute',
            },
        ],
    },
    {
        title: '产品管理',
        type: 'group',
        icon: 'mdi-basket-outline',
        children:[
            {
                title: '产品',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/product',
            },
            {
                title: '分类',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/product-category',
            },
            {
                title: '属性',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/product-attribute',
            },
        ]

    },
    {
        title: '客户关系',
        type: 'group',
        icon: 'mdi-account-cash-outline',
        children:[
            {
                title: '订单',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/order',
            },
            {
                title: '客户',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/customer',
            },
            {
                title: '供应商',
                type: 'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/supplier',
            },
        ]

    },
    {
        title: '询盘管理',
        type: 'group',
        //to: '/admin/module/role/',
        icon: 'mdi-email-outline',
 
        children: [
            {
                title:"询盘",
                type:'item',
                icon: 'mdi-circle-small',
                //to: '/admin/module/user/',
                badge: {
                    color: 'secondary',
                    field: 'inquiries',
                    size: 'small',
                }               
            },
            {
                title:"垃圾箱",
                type:'item',
                icon: 'mdi-circle-small',
                //to: '/admin/module/role/',
            },
            {
                title:"拦截设置",
                type:'item',
                icon: 'mdi-circle-small',
                //to: '/admin/module/role/',
            }


        ]

    },
    {
        title:"用户",
        type: 'group',
        icon: 'mdi-account-circle',
        children: [
            {
                title:"管理员",
                type:'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/user/',
            },
            {
                title:"角色",
                type:'item',
                icon: 'mdi-circle-small',
                to: '/admin/module/role/',
            }

        ]
    },
    {
        type: 'subheader',
        title: '菜单演示',
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
                chip: {
                    color: 'primary',
                    label: '很牛',
                    size: 'small',
                },
            },

        ],
    },

]