import { IModelNode } from "Base/ModelTree/IModelNode";
import { useEffect } from "react";
import { useAppStore } from "Store/Helpers/useAppStore";

export default function useSelectModel(modelNode:IModelNode|undefined, rxid:string|undefined){
  const appStore = useAppStore();
  
  useEffect(()=>{
    if(modelNode){
      if(modelNode.isSelected){
        appStore.setSelectModelComponentRxid(rxid);
      }
      return()=>{
        appStore.setSelectModelComponentRxid(undefined);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelNode?.isSelected, rxid])
}