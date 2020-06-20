export default [{
        name: 'Grid',
        props: {
            container: true,
            justify: 'space-between',
        },
        children: [{
                name: 'Grid',
                props: {
                    item: true,
                },
                children: [{
                    name: 'h2',
                    text: '仪表盘',
                }],
            },
            {
                name: 'Grid',
                //text: 'test',
                props: {
                    item: true,
                },
            },
        ]
    },
  ]