import { API_GET_PAGE, API_GET_MODULE_INDEX_PAGE } from "APIs/modules";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "base/Hooks/useAxios";
import { IPage } from "base//Model/IPage";
import { useEffect, useState } from "react";
import { cloneObject } from "utils/cloneObject";

declare var window: {schemaCache: {[key: string]: IPage }};

window.schemaCache = {};

//var pagesCache = new PagesCache()

export default function usePageMeta(moduleSlug:number, pageSlug:number):[IPage|undefined, boolean, boolean]{
  
  const [pageRequest, setPageRequest] = useState<AxiosRequestConfig>();
  const [pageMeta, loadingPage, error] = useAxios<IPage>(pageRequest)
  const [cachedPageMeta, setCachedPageMeta] = useState<IPage>();
  const pageKey = `/module/${moduleSlug}/${pageSlug||''}`;
  
  useEffect(() => {
    let page = window.schemaCache[pageKey];
    if(!page){
      setCachedPageMeta(undefined);
      if(pageSlug){
        setPageRequest({...API_GET_PAGE, params:{pageSlug: pageSlug}})      
      }else{
        setPageRequest({...API_GET_MODULE_INDEX_PAGE, params:{moduleSlug: moduleSlug}})
      }      
    }
    else{
      let pageCopy = cloneObject(page)
      setCachedPageMeta(pageCopy);
    }
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[moduleSlug, pageSlug]);
  
  useEffect(()=>{
    if(pageMeta){
      let pageMetaCopy = cloneObject(pageMeta);
      window.schemaCache[pageKey] = pageMetaCopy;
      //console.log(pageKey, pageMetaCopy)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMeta])
  
  return [cachedPageMeta ? cachedPageMeta : pageMeta, loadingPage, error];
}

export function clearPageSchemaCache(){
  window.schemaCache = {}
}