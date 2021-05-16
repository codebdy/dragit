import { useEffect } from "react";
import intl from 'react-intl-universal';
import { useDragItStore } from "./useDragItStore";

export function useAxiosError(error?:any){
  const appStore = useDragItStore() 
  useEffect(()=>{
    if(error){
      appStore.infoError(intl.get('server-error'), error?.message)
      console.log(error);  
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])
}