import { useContext } from 'react';
import { ThemeSettings } from 'AppBoard/store/ThemeSettings';
import { AppBoardStoreContext } from './AppBoardStore';

export const useThemeSettings = (): ThemeSettings => useContext(AppBoardStoreContext).themeSettings;
