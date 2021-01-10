import { IMeta } from 'base1/Model/IMeta';
import { FieldStore } from 'base1/ModelTree/FieldStore';
import { useEffect } from 'react';
import { useModelStore } from '../../base1/ModelTree/ModelProvider';

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
