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
                    text: '文章编辑',
                }],
            },
            {
                name: 'Grid',
                //text: 'test',
                props: {
                    item: true,
                },
                children: [{
                    name: 'Button',
                    text: '保存',
                    props: {
                        variant: "contained",
                        color: "primary",
                        //size: "large",
                        style: {
                            fontSize: '1.1rem',
                        }
                    }
                }]
            },
        ]
    },
    {
            name: 'Grid',
            props: {
                container: true,
            },
            children: [{
                    name: 'Grid',
                    props: {
                        item: true,
                    },
                },
                {
                    name: 'Grid',
                    props: {
                        item: true,
                    },
                },
                {
                    name: 'Grid',
                    props: {
                        item: true,
                    },
                }
            ]
    },
    {
            name: 'Grid',
            props: {
                container: true,
                spacing: 3,
            },

            children: [{
                    name: 'Grid',
                    props: {
                        item: true,
                        md: 8,
                    },
                    children: [{
                        name: 'Card',
                        props: {
                            elevation: 6,
                        },
                        children: [{
                                name: 'CardHeader',
                                props: {
                                    title: '基本信息',
                                }

                            },
                            {
                                name: 'Divider'
                            },
                            {
                                name: 'CardContent',
                                text: 'body',
                            },
                            {
                                name: 'CardActions',
                                children: [{
                                    name: 'Button',
                                    text: '保存',
                                    props: {
                                        variant: "contained",
                                        color: "primary",
                                    }
                                }]
                            }
                        ]
                    }]
                },
                {
                    name: 'Grid',
                    props: {
                        item: true,
                        md: 4,
                    },
                    children: [{
                        name: 'Paper',
                        props: {
                            elevation: 6,
                        },
                        text: 'Right first Paper',
                    }]
                }
            ]

    }
]
