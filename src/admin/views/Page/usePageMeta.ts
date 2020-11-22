import { API_GET_PAGE, API_GET_MODULE_INDEX_PAGE } from "APIs/modules";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "base/Hooks/useAxios";
import { IPage } from "base/IPage";
import { useEffect, useState } from "react";

const modulePrix = "module-index-";
const pagePrix = "page-";

class PagesCache{
  private schemaCache : {[key: string]: IPage }= {};

  addModuleIndexPage(moduleId:number,  page:IPage){
    this.schemaCache[modulePrix + moduleId] = page;
  }

  addPage(page:IPage){
    this.schemaCache[pagePrix + page.id] = page;
  }

  getModuleIndexPage(moduleId:number):IPage{
    return this.schemaCache[modulePrix + moduleId];
  }

  getPage(id:number){
    return this.schemaCache[pagePrix + id];
  }
}

var pagesCache = new PagesCache()

export default function usePageMeta(moduleId:number, pageId:number):[IPage|undefined, boolean, boolean]{
  
  const [pageRequest, setPageRequest] = useState<AxiosRequestConfig>();
  const [pageMeta, loadingPage, error] = useAxios<IPage>(pageRequest)
  const [cachedPageMeta, setCachedPageMeta] = useState<IPage>();

  const getCachedPage = ():IPage=>{
    if(pageId){
      return pagesCache.getPage(pageId);
    }else{
      return pagesCache.getModuleIndexPage(moduleId);      
    }

  }
  
  useEffect(() => {
    let page = getCachedPage();
    if(!page){
      if(pageId){
        setPageRequest({...API_GET_PAGE, params:{pageId}})      
      }else{
        setPageRequest({...API_GET_MODULE_INDEX_PAGE, params:{moduleId}})
      }      
    }
    else{
      let pageCopy = JSON.parse(JSON.stringify(page))
      setCachedPageMeta(pageCopy);
    }
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[moduleId, pageId]);
  
  useEffect(()=>{
    if(pageMeta){
      let pageMetaCopy = JSON.parse(JSON.stringify(pageMeta))
      if(pageId){
        pagesCache.addPage(pageMetaCopy)
      }else{
        pagesCache.addModuleIndexPage(moduleId, pageMetaCopy)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMeta])
  
  return [cachedPageMeta ? cachedPageMeta : pageMeta, loadingPage, error];
}