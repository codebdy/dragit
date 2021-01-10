import { IPageJumper } from "Base/Model/IPageJumper";

const resolvePageUrl=(page:IPageJumper)=>{
  return `/admin/module/${page.moduleSlug}/${page.pageId||''}` + (page.dataId ? '/' + page.dataId : '' );
}

export {resolvePageUrl}