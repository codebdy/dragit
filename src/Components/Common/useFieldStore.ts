import { RXModel } from 'Base/ModelTree/RXModel';
import { useRXNode } from 'Base/RXNode/RXNodeProvider';
import { useEffect } from 'react';
import { useModelStore } from '../../Base/ModelTree/ModelProvider';

export const useFieldStore = () => {
  const node = useRXNode();
  const modelStore = useModelStore();
  const fieldName = node?.meta.field;
  useEffect(()=>{
    if(node && fieldName){
      const rxModel = new RXModel(node, fieldName);
      rxModel.setModel(modelStore?.value)
      modelStore?.setChild(fieldName, rxModel);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldName, modelStore])

  return modelStore?.getChild(fieldName);
};
