import Mock from 'mockjs'
import drawer from './drawer'

Mock.mock('/api/drawer', 'get', drawer)

Mock.setup({
  timeout: 1000
})