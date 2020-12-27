import { createContext } from 'react';
import { PageStore } from './PageStore';

export const PageContext = createContext<PageStore>({} as PageStore);
export const PageProvider = PageContext.Provider;
