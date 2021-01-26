import { createContext } from 'react';
import {DragItStore} from "../DragItStore";

export const DragItStoreContext = createContext<DragItStore>({} as DragItStore);
export const DragItStoreProvider = DragItStoreContext.Provider;
