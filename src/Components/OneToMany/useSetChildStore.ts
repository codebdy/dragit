import { IMeta } from "Base/Model/IMeta";
import { makeTableModel } from "Base/ModelTree/makeTableModel";
import { useModelStore } from "Base/ModelTree/ModelProvider";
import { RXModel } from "Base/ModelTree/RXModel";
import { RXNode } from "Base/RXNode/RXNode";
import { useEffect } from "react";

export function useSetChildStore(rxNode:RXNode<IMeta>, rowComponentName:string){
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getChild(rxNode?.meta.field);

  useEffect(()=>{
    const field = rxNode?.meta.field;
    if(rxNode && field){
      const model = new RXModel(rxNode, field);
      modelStore?.setChild(field, model);
      return ()=>{
        modelStore?.removeChildStore(field);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rxNode]);

  useEffect(()=>{
    makeTableModel(fieldStore?.value, fieldStore, rxNode, rowComponentName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldStore?.value])
}