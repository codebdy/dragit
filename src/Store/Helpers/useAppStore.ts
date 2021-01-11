import { useContext } from 'react';
import { AppStore } from 'Store/AppStore';
import { DesignerStore } from 'Store/DesignerStore';
import { LeftDrawer } from 'Store/LeftDrawer';
import { ThemeSettings } from 'Store/ThemeSettings';
import { AppStoreContext } from './AppStoreProvider';

export const useAppStore = (): AppStore => useContext(AppStoreContext);
export const useLeftDrawer = (): LeftDrawer => useContext(AppStoreContext).leftDrawer;
export const useThemeSettings = (): ThemeSettings => useContext(AppStoreContext).themeSettings;
export const useDesigner = (): DesignerStore => useContext(AppStoreContext).designer;
