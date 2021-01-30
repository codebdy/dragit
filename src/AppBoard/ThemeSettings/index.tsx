import React from 'react';
import {Divider, createMuiTheme, ThemeProvider} from '@material-ui/core';
import intl from "react-intl-universal";
import { ThemeMode } from './ThemeMode';
import { ThemeColor } from './ThemeColor';
import { ToolbarSettings } from './ToolbarSettings';
import { ElevationStrength } from './ElevationStrength';
import { SidebarSettings } from './SidebarSettings';
import RightDrawer from 'AppBoard/ThemeSettings/RightDrawer';
import {observer} from 'mobx-react';
import { useThemeSettings, useDragItStore } from 'Store/Helpers/useDragItStore';
import useShadows from 'Utils/useShadows';

export const ThemeSettings = observer(()=>{

  const themeSettings = useThemeSettings();
  const appStore = useDragItStore();
  
  const theme = createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },

    shadows:[...useShadows()] as any
  });

  return (
    <ThemeProvider theme={theme}>
      <RightDrawer
        title = {intl.get('theme-settings')}
        onClose = {()=>appStore.closeShowThemeSettings()}
        open={appStore.showThemeSettings}
      >
        <ThemeMode />
        <Divider />
        <ThemeColor />
        <Divider />
        <SidebarSettings/>
        <Divider />
        <ToolbarSettings />
        <Divider />
        <ElevationStrength />
      </RightDrawer>
    </ThemeProvider>
  )
})
