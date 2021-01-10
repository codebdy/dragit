import { IMeta } from 'Base/Model/IMeta';
import { FieldStore } from 'Base/ModelTree/FieldStore';
import { useEffect } from 'react';
import { useModelStore } from '../../Base/ModelTree/ModelProvider';

export const useFieldStore = (meta: IMeta) => {
  const modelStore = useModelStore();
  const fieldName = meta?.props?.field;
  useEffect(()=>{
    if(fieldName){
      modelStore?.setFieldStore(fieldName, new FieldStore(meta))      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldName, modelStore])

  return modelStore?.getFieldStore(fieldName);
};
