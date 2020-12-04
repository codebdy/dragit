import { AxiosRequestConfig } from "axios";
import { IPage } from "base/Model/IPage";
import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";

var dataCache : {[key: string]: IPage }= {}

function resolveRequestKey(config?:AxiosRequestConfig){
  if(!config || config.data || config.method === 'post'){
    return undefined;
  }
  var key = config.url + '?';
  Object.keys(config.params||{}).forEach((param:any)=>{
    key = key + '&' + param + '=' + config.params[param];
  });

  return key
}

//获取基础项目数据，带缓存机制
export function useBaseItems(config?:AxiosRequestConfig){
  const [request, setRequest] = useState<AxiosRequestConfig>();
  const [items, loading, error] = useAxios<IPage>(request)
  const [cachedItemsData, setCachedItemsData] = useState<any[]>();
  const key = resolveRequestKey(config);
  useEffect(() => {
    if(key){
      let data = dataCache[key];
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
    if(items && key){
      dataCache[key] = items;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  
  return [cachedItemsData ? cachedItemsData : items, loading, error];
}