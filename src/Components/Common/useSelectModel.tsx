import { usePageStore } from "Base/PageUtils/PageStore";
import { useEffect } from "react";
import { RXModel } from "Base/ModelTree/RXModel";

export default function useSelectModel(modelNode:RXModel|undefined){
  const pageStore = usePageStore();
  const rxid = modelNode?.node.rxid;
  
  useEffect(()=>{
    if(modelNode?.isSelected){
      pageStore?.setSelectModelComponentRxid(rxid);
    }
    else if(pageStore?.selectModelComponentRxid === rxid){
      pageStore?.setSelectModelComponentRxid(undefined);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelNode?.isSelected])
}