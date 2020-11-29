import { AxiosRequestConfig } from "axios";
import { useAxios } from "base/Hooks/useAxios";
import { IPage, IPageSchema } from "base//Model/IPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModelAction, setModelLoadingAction } from "store/page/actions";

export default function useFecthPageModel(page:IPageSchema|undefined, id:number|undefined){
  
  const [pageRequest, setPageRequest] = useState<AxiosRequestConfig>();
  const [pageModel, loadingModel, error] = useAxios<IPage>(pageRequest)

  const dispatch = useDispatch();

  useEffect(() => {
    let api = page?.api;
    if(id && api){
      setPageRequest({...api, params:{...api.params, id}})        
    }
  },[page, id]);
  
  useEffect(()=>{
    dispatch(setModelLoadingAction(loadingModel));
    dispatch(setModelAction(pageModel));
  }, [dispatch, pageModel, loadingModel])

  return [pageModel, loadingModel, error];
}