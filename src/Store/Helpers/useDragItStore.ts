import { useContext } from 'react';
import { DragItStore } from 'Store/DragItStore';
import { DesignerStore } from 'Store/DesignerStore';
import { LeftDrawer } from 'Store/LeftDrawer';
import { ThemeSettings } from 'Store/ThemeSettings';
import { DragItStoreContext } from './DragItStoreProvider';

export const useDragItStore = (): DragItStore => useContext(DragItStoreContext);
export const useLeftDrawer = (): LeftDrawer => useContext(DragItStoreContext).leftDrawer;
export const useThemeSettings = (): ThemeSettings => useContext(DragItStoreContext).themeSettings;
export const useDesigner = (): DesignerStore => useContext(DragItStoreContext).designer;
