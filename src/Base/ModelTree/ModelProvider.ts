import { useContext } from 'react';
import { createContext } from 'react';
import { IModelNode } from './IModelNode';

export const ModelContext = createContext<IModelNode|undefined>(undefined);
export const ModelProvider = ModelContext.Provider;
export const useModelStore = (): IModelNode|undefined => useContext(ModelContext);

