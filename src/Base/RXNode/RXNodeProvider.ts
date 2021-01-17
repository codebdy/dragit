import { IMeta } from 'Base/Model/IMeta';
import { createContext, useContext } from 'react';
import { RXNode } from './RXNode';

export const RXNodeContext = createContext<RXNode<IMeta>|undefined>( undefined);
export const RXNodeProvider = RXNodeContext.Provider;

export const useRXNode = (): RXNode<IMeta>|undefined => useContext(RXNodeContext);