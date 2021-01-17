import { FieldStore } from 'Base/ModelTree/FieldStore';
import { useRXNode } from 'Base/RXNode/RXNodeProvider';
import { useEffect } from 'react';
import { useModelStore } from '../../Base/ModelTree/ModelProvider';

export const useFieldStore = () => {
  const node = useRXNode();
  const modelStore = useModelStore();
  const fieldName = node?.meta.field;
  useEffect(()=>{
    if(node && fieldName){
      modelStore?.setFieldStore(fieldName, new FieldStore(node))      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldName, modelStore])

  return modelStore?.getFieldStore(fieldName);
};
