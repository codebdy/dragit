import React from "react";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LeftDrawer from "./LeftDrawer";
import {observer} from "mobx-react";
import { useThemeSettings } from "AppBoard/store/useThemeSettings";

export enum SidebarSize{
  small = "small",
  medium = "medium",
  large = "large"
}

/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称
 * @props
 */
const Sidebar = observer((
  props:{
    children:any,
  }
) => {
  const {children} = props;
  const themeSettings = useThemeSettings();
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.leftDrawerSkin.mode as any,
      primary:{
        main:themeSettings.primary,
      },
    },
    
    typography: {
      body1: {
        fontFamily:'Roboto, Noto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '0.9rem',
        letterSpacing:'0.05rem',
      },

    },
  }));

  return(
    <ThemeProvider theme={theme}>
      <LeftDrawer>
        {children}
      </LeftDrawer>
    </ThemeProvider>

  ) 
  
})

export default Sidebar

