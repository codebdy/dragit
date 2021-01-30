import { createContext } from 'react';
import {DragItStore} from "../DragItStore";

export const DragItContext = createContext<DragItStore>({} as DragItStore);
export const DragItStoreProvider = DragItContext.Provider;
