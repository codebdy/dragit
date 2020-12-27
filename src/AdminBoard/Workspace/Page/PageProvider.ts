import { useContext } from 'react';
import { createContext } from 'react';
import { ModelStore } from './ModelStore';

export const ModelContext = createContext<ModelStore>({} as ModelStore);
export const PageProvider = ModelContext.Provider;
export const useModelStore = (): ModelStore => useContext(ModelContext);
export const useFieldStore = (fieldName:string)=>{
  const modelStore =  useModelStore();
  return modelStore.fields.get(fieldName);
}
