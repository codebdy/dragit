import { OneToManyPortletView } from "./oneToManyPortlet/view";
import { OneToManyTableView } from "./oneToManyTable/view";
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
    schema:OneToManyPortletView,
  },
  {
    id:'guid-p-3',
    name:'1对多表格',
    schema:OneToManyTableView,
  }
]

export default demoPages;