import { useContext } from 'react';
import { AppStore } from 'store1/AppStore';
import { DesignerStore } from 'store1/DesignerStore';
import { LeftDrawer } from 'store1/LeftDrawer';
import { ThemeSettings } from 'store1/ThemeSettings';
import { AppStoreContext } from './AppStoreProvider';

export const useAppStore = (): AppStore => useContext(AppStoreContext);
export const useLeftDrawer = (): LeftDrawer => useContext(AppStoreContext).leftDrawer;
export const useThemeSettings = (): ThemeSettings => useContext(AppStoreContext).themeSettings;
export const useDesigner = (): DesignerStore => useContext(AppStoreContext).designer;
