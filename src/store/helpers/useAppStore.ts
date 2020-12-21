import { useContext } from 'react';
import { AppStore } from 'store/AppStore';
import { Designer } from 'store/Designer';
import { LeftDrawer } from 'store/LeftDrawer';
import { ThemeSettings } from 'store/ThemeSettings';
import { AppStoreContext } from './AppStoreProdivider';

export const useAppStore = (): AppStore => useContext(AppStoreContext);
export const useLeftDrawer = (): LeftDrawer => useContext(AppStoreContext).leftDrawer;
export const useThemeSettings = (): ThemeSettings => useContext(AppStoreContext).themeSettings;
export const useDesigner = (): Designer => useContext(AppStoreContext).designer;
