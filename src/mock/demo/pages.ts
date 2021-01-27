import { splitSubmitSchema } from "./splitSubmit/splitSubmitSchema";

var demoPages = [
  {
    id:'guid-p-1',
    name:'独立提交',
    schema:splitSubmitSchema,
  },
  {
    id:'guid-p-2',
    name:'1对多面板',
  },
  {
    id:'guid-p-3',
    name:'1对多表格',
  }
]

export default demoPages;