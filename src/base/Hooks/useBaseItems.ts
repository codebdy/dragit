import { AxiosRequestConfig } from "axios";
import { IPage } from "base/Model/IPage";
import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";

var dataCache : {[key: string]: IPage }= {}

//获取基础项目数据，带缓存机制
export function useBaseItems(config?:AxiosRequestConfig){
  const [request, setRequest] = useState<AxiosRequestConfig>();
  const [items, loading, error] = useAxios<IPage>(request)
  const [cachedItemsData, setCachedItemsData] = useState<any[]>();

  useEffect(() => {
    if(config?.url){
      let data = dataCache[config.url];
      if(!data){
        setRequest(config)
      }
      else{
        let dataCopy = JSON.parse(JSON.stringify(data))
        setCachedItemsData(dataCopy);
      }

    }
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[config]);
  
  useEffect(()=>{
    if(items && config?.url){
      dataCache[config.url] = items;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  
  return [cachedItemsData ? cachedItemsData : items, loading, error];
}