import { IMeta } from 'Base/RXNode/IMeta';
import { RXModel } from 'Base/ModelTree/RXModel';
import { RxNode } from 'rx-drag/RxNode';
import { useEffect } from 'react';
import { useModelStore } from '../../Base/ModelTree/ModelProvider';

export const useFieldStore = (node:RxNode<IMeta>) => {
  const modelStore = useModelStore();
  const fieldName = node?.meta.field;
  useEffect(()=>{
    if(node && fieldName){
      const rxModel = new RXModel(node, fieldName);
      rxModel.initWithModel(modelStore?.value);
      rxModel.setLabel(`Field : ${fieldName}`);
      modelStore?.setChild(fieldName, rxModel);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldName, modelStore])

  return modelStore?.getChild(fieldName);
};
