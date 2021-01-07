import { useContext } from 'react';
import { createContext } from 'react';
import { PageGQLStore } from './PageGQLStore';

export const GQLContext = createContext<PageGQLStore|undefined>(undefined as unknown as PageGQLStore);
export const PageGQLProvider = GQLContext.Provider;
export const usePageGQLStore = (): PageGQLStore|undefined => useContext(GQLContext);

