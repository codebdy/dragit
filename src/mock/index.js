import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'

Mock.mock('/api/drawer', 'get', drawer)
Mock.mock('/api/page/dashboard', 'get', dashboard)

Mock.setup({
    timeout: 1000
})