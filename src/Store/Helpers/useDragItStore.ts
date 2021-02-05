import { useContext } from 'react';
import { DragItStore } from 'Store/DragItStore';
import { DesignerStore } from 'Store/DesignerStore';
import { LeftDrawer } from 'Store/LeftDrawer';
import { DragItContext } from './DragItStoreProvider';

export const useDragItStore = (): DragItStore => useContext(DragItContext);
export const useLeftDrawer = (): LeftDrawer => useContext(DragItContext).leftDrawer;
export const useDesigner = (): DesignerStore => useContext(DragItContext).designer;
