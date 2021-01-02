import { useContext } from 'react';
import { createContext } from 'react';
import { IModelStore } from './IModelStore';

export const ModelContext = createContext<IModelStore|undefined>({} as IModelStore);
export const ModelProvider = ModelContext.Provider;
export const useModelStore = (): IModelStore|undefined => useContext(ModelContext);

