import { IMetaProps } from 'Base/Model/IMeta';
import { FieldStore } from 'Base/ModelTree/FieldStore';
import { useEffect } from 'react';
import { useModelStore } from '../../Base/ModelTree/ModelProvider';

export const useFieldStore = (metaProps: IMetaProps) => {
  const modelStore = useModelStore();
  const fieldName = metaProps?.field;
  useEffect(()=>{
    if(fieldName){
      modelStore?.setFieldStore(fieldName, new FieldStore(metaProps))      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldName, modelStore])

  return modelStore?.getFieldStore(fieldName);
};
