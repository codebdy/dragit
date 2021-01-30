import { useContext } from 'react';
import { ThemeSettings } from 'AppBoard/store/ThemeSettings';
import { DragItContext } from '../../Store/Helpers/DragItStoreProvider';

export const useThemeSettings = (): ThemeSettings => useContext(DragItContext).themeSettings;
