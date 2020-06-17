import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'
import test from './views/test'

Mock.mock('/api/drawer', 'get', drawer)
Mock.mock('/api/page/dashboard', 'get', dashboard)
Mock.mock('/api/page/test', 'get', test)

Mock.setup({
    timeout: 1000
})