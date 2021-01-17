import { usePageStore } from "Base/PageUtils/PageStore";
import { IModelNode } from "Base/ModelTree/IModelNode";
import { useEffect } from "react";

export default function useSelectModel(modelNode:IModelNode|undefined, rxid:string|undefined){
  const pageStore = usePageStore();
  
  useEffect(()=>{
    if(modelNode?.isSelected){
      pageStore?.setSelectModelComponentRxid(rxid);
    }
    else if(pageStore?.selectModelComponentRxid === rxid){
      pageStore?.setSelectModelComponentRxid(undefined);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelNode?.isSelected, rxid])
}