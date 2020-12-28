import { useContext } from 'react';
import { createContext } from 'react';
import { IModelStore } from './IModelStore';

export const ModelContext = createContext<IModelStore>({} as IModelStore);
export const ModelProvider = ModelContext.Provider;
export const useModelStore = (): IModelStore => useContext(ModelContext);
export const useFieldStore = (fieldName:string)=>{
  const modelStore =  useModelStore();
  return modelStore.getFieldStore(fieldName);
}
