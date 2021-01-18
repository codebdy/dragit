import { useContext } from 'react';
import { createContext } from 'react';
import { RXModel } from './RXModel';

export const ModelContext = createContext<RXModel|undefined>(undefined);
export const ModelProvider = ModelContext.Provider;
export const useModelStore = (): RXModel|undefined => useContext(ModelContext);

