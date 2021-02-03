import { dashboardSchema } from "./dashboard/pageSchema";
import { enquiryListSchema } from "./enquires/enquiryListSchema";
import { viewEnquirySchema } from "./enquires/viewEnquirySchema";
import { mediasPageSchema } from "./medias/mediasPageSchema";

var cmsPages = [
  {
    id:'guid-p-cms-1',
    name:'分析看板',
    schema:dashboardSchema as any,
  },
  {
    id:'guid-p-cms-2',
    name:'询盘列表',
    schema:enquiryListSchema as any,
  },
  {
    id:'guid-p-cms-3',
    name:'询盘查看',
    max_width:'sm',
    query:'readEnquiry',
    excute_query_by_mutation:true,
    schema:viewEnquirySchema as any,
  },
  {
    id:'guid-p-cms-4',
    name:'媒体库',
    schema:mediasPageSchema as any,
  },
  {
    id:'guid-p-cms-5',
    name:'文章列表',
    //schema:roleList,
  },
  {
    id:'guid-p-cms-6',
    name:'文章编辑',
    query:'rxRole',
    //schema:roleEdit,
  },

]

export default cmsPages;