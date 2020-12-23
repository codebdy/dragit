import React from 'react';
import {Divider, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import intl from "react-intl-universal";
import useShadows from 'utils/useShadows';
import { useThemeSettings } from 'store/helpers/useAppStore';
import { ThemeMode } from './ThemeMode';
import { ThemeColor } from './ThemeColor';
import { ToolbarSettings } from './ToolbarSettings';
import { ElevationStrength } from './ElevationStrength';
import { SidebarSettings } from './SidebarSettings';
import RightDrawer from 'AdminBoard/ThemeSettings/RightDrawer';

export default function ThemeSettings(
  props:{
    open:boolean,
    onClose:()=>void
  }
){
  const {open, onClose} = props;
  const themeSettings = useThemeSettings();
  
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },

    shadows:[...useShadows()] as any
  }));

  return (
    <ThemeProvider theme={theme}>
      <RightDrawer
        title = {intl.get('theme-settings')}
        onClose = {onClose}
        open={open}
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
}
