import jumpEdit from "./jumpStyleModule/jumpEdit";
import jumpList from "./jumpStyleModule/jumpList";
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
  },
  {
    id:'guid-p-4',
    name:'文章列表',
    schema:jumpList,
  },
  {
    id:'guid-p-5',
    name:'文章编辑',
    schema:jumpEdit,
  },

]

export default demoPages;