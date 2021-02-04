import articleChannelSchema from "./channel/articleChannelSchema";
import { dashboardSchema } from "./dashboard/pageSchema";
import { enquiryListSchema } from "./enquires/enquiryListSchema";
import { viewEnquirySchema } from "./enquires/viewEnquirySchema";
import { mediasPageSchema } from "./medias/mediasPageSchema";
import { postEditSchema } from "./post/views/editPage";
import { postListSchema } from "./post/views/listPage";
import { postTagEditSchema } from "./postTag/postTagEditSchema";
import { postTagListSchema } from "./postTag/postTagListSchema";

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
    schema:postListSchema,
  },
  {
    id:'guid-p-cms-6',
    name:'文章编辑',
    query:'post',
    schema:postEditSchema,
  },

  {
    id:'guid-p-cms-7',
    name:'文章频道',
    //query:'post',
    schema:articleChannelSchema,
  },

  {
    id:'guid-p-cms-8',
    name:'文章标签列表',    
    schema:postTagListSchema,
  },
  {
    id:'guid-p-cms-9',
    name:'文章标签编辑',
    max_width:'xs',
    query:'postTag',
    schema:postTagEditSchema,
  },
  {
    id:'guid-p-cms-10',
    name:'文章属性列表',
    //query:'post',
    //schema:articleChannelSchema,
  },
  {
    id:'guid-p-cms-11',
    name:'文章属性编辑',
    //query:'post',
    //schema:articleChannelSchema,
  },

]

export default cmsPages;