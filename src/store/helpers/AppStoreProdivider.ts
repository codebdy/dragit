import { createContext } from 'react';
import {AppStore} from "../AppStore";

export const AppStoreContext = createContext<AppStore>({} as AppStore);
export const AppStoreProdivider = AppStoreContext.Provider;
