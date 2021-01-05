import { useContext } from 'react';
import { AppStore } from 'store/AppStore';
import { DesignerStore } from 'store/DesignerStore';
import { LeftDrawer } from 'store/LeftDrawer';
import { ThemeSettings } from 'store/ThemeSettings';
import { AppStoreContext } from './AppStoreProvider';

export const useAppStore = (): AppStore => useContext(AppStoreContext);
export const useLeftDrawer = (): LeftDrawer => useContext(AppStoreContext).leftDrawer;
export const useThemeSettings = (): ThemeSettings => useContext(AppStoreContext).themeSettings;
export const useDesigner = (): DesignerStore => useContext(AppStoreContext).designer;
