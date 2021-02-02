import drawerList from "./drawerStyleModule/drawerList";
import jumpEdit from "./jumpStyleModule/jumpEdit";
import jumpList from "./jumpStyleModule/jumpList";
import { OneToManyPortletView } from "./oneToManyPortlet/view";
import { OneToManyTableView } from "./oneToManyTable/view";
import popEdit from "./popStyleModule/popEdit";
import popList from "./popStyleModule/popList";
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
    query:'post',
    schema:jumpEdit,
  },
  {
    id:'guid-p-6',
    name:'用户列表',
    schema:popList,
  },
  {
    id:'guid-p-7',
    name:'用户编辑',
    max_width: 'sm',
    schema:popEdit,
  },

  {
    id:'guid-p-8',
    name:'侧滑式列表',
    schema:drawerList,
  },
  {
    id:'guid-p-9',
    name:'用户编辑',
    width:'400',
    schema:popEdit,
  }

]

export default demoPages;