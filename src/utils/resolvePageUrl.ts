import { IPageJumper } from "base/Model/IPageJumper";

const resolvePageUrl=(page:IPageJumper)=>{
  return `/admin/module/${page.moduleSlug}/${page.pageSlug||''}` + (page.dataId ? '/' + page.dataId : '' );
}

export {resolvePageUrl}